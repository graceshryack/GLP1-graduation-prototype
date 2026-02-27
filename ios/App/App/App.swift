import SwiftUI
import WebKit

/// Message handler name used in both Swift and the injected script—must match exactly.
private let kConsoleLogHandlerName = "consoleLog"

/// Forwards WKWebView console.log/error to the Xcode console.
private final class ConsoleLogHandler: NSObject, WKScriptMessageHandler {
    let onMessage: (String, String) -> Void
    init(onMessage: @escaping (String, String) -> Void) { self.onMessage = onMessage }
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        guard let dict = message.body as? [String: Any],
              let level = dict["level"] as? String,
              let msg = dict["message"] as? String else { return }
        onMessage(level, msg)
    }
}

// MARK: - Framework: Native iOS (SwiftUI @main) wrapping a single-file web app in WKWebView.
// Entry: App → WindowGroup → WebViewHost (UIViewControllerRepresentable) → WebViewController (view = WKWebView).
// First paint: WebViewController.loadView() sets view = webView; viewDidLoad() calls loadContent().

// App background gray so we never show white (#e8eaed)
private let appBackground = Color(red: 0.91, green: 0.92, blue: 0.93)

@main
struct App: SwiftUI.App {
    var body: some Scene {
        WindowGroup {
            RootView()
        }
    }
}

/// Root view: gray background + WebView + "Loading…" or error message until first load finishes or fails.
struct RootView: View {
    @State private var loadFinished = false
    @State private var loadError: String?
    @State private var retryTrigger = 0
    var body: some View {
        ZStack {
            appBackground
                .ignoresSafeArea()
            WebViewHost(
                retryTrigger: retryTrigger,
                onLoadFinished: { loadFinished = true; loadError = nil },
                onLoadFailed: { loadError = $0 }
            )
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .ignoresSafeArea()
            if let msg = loadError {
                VStack(spacing: 16) {
                    Text(msg)
                        .font(.title2)
                        .foregroundColor(Color(red: 0.12, green: 0.18, blue: 0.23))
                        .multilineTextAlignment(.center)
                        .padding()
                    Button("Retry") {
                        loadError = nil
                        loadFinished = false
                        retryTrigger += 1
                    }
                    .font(.headline)
                    .padding(.horizontal, 24)
                    .padding(.vertical, 12)
                    .background(Color(red: 0.12, green: 0.23, blue: 0.37))
                    .foregroundColor(.white)
                    .cornerRadius(10)
                }
            } else if !loadFinished {
                Text("Loading…")
                    .font(.title)
                    .foregroundColor(Color(red: 0.12, green: 0.18, blue: 0.23))
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .ignoresSafeArea()
        .onAppear {
            DispatchQueue.main.asyncAfter(deadline: .now() + 12) {
                if !loadFinished && loadError == nil { loadError = "Loading timed out. The app may have failed to load." }
            }
        }
    }
}

struct WebViewHost: UIViewControllerRepresentable {
    var retryTrigger: Int = 0
    var onLoadFinished: () -> Void = {}
    var onLoadFailed: (String) -> Void = { _ in }
    func makeUIViewController(context: Context) -> WebViewController {
        WebViewController(onLoadFinished: onLoadFinished, onLoadFailed: onLoadFailed)
    }
    func updateUIViewController(_ uiViewController: WebViewController, context: Context) {
        uiViewController.reloadIfNeeded(retryTrigger: retryTrigger)
    }
}

final class WebViewController: UIViewController, WKNavigationDelegate {
    private var webView: WKWebView!
    private var onLoadFinished: () -> Void
    private var onLoadFailed: (String) -> Void
    private var lastRetryTrigger = 0
    private var consoleLogHandler: ConsoleLogHandler!
    init(onLoadFinished: @escaping () -> Void = {}, onLoadFailed: @escaping (String) -> Void = { _ in }) {
        self.onLoadFinished = onLoadFinished
        self.onLoadFailed = onLoadFailed
        super.init(nibName: nil, bundle: nil)
    }
    required init?(coder: NSCoder) { fatalError("init(coder:) has not been implemented") }
    func reloadIfNeeded(retryTrigger: Int) {
        guard retryTrigger != lastRetryTrigger else { return }
        lastRetryTrigger = retryTrigger
        loadContent()
    }

    override func loadView() {
        let config = WKWebViewConfiguration()
        config.preferences.javaScriptEnabled = true
        config.allowsInlineMediaPlayback = true
        config.preferences.setValue(true, forKey: "allowFileAccessFromFileURLs")
        let ucc = config.userContentController
        consoleLogHandler = ConsoleLogHandler { level, msg in
            DispatchQueue.main.async { print("[JS \(level)] \(msg)") }
        }
        ucc.add(consoleLogHandler!, name: kConsoleLogHandlerName)
        let consoleScriptSource = """
        (function() {
          var name = '\(kConsoleLogHandlerName)';
          var h = window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers[name];
          if (!h) return;
          function send(level, args) {
            try {
              var msg = Array.prototype.slice.call(args).map(function(x) { return typeof x === 'object' ? JSON.stringify(x) : String(x); }).join(' ');
              h.postMessage({ level: level, message: msg });
            } catch (e) {}
          }
          var origLog = console.log; console.log = function() { origLog.apply(console, arguments); send('log', arguments); };
          var origErr = console.error; console.error = function() { origErr.apply(console, arguments); send('error', arguments); };
        })();
        """
        ucc.addUserScript(WKUserScript(source: consoleScriptSource, injectionTime: .atDocumentStart, forMainFrameOnly: true))
        ucc.addUserScript(WKUserScript(source: consoleScriptSource, injectionTime: .atDocumentEnd, forMainFrameOnly: true))
        let wv = WKWebView(frame: .zero, configuration: config)
        wv.translatesAutoresizingMaskIntoConstraints = false
        wv.navigationDelegate = self
        wv.scrollView.bounces = true
        wv.isOpaque = true
        wv.backgroundColor = UIColor(red: 0.91, green: 0.92, blue: 0.93, alpha: 1) // match --bg #e8eaed
        wv.scrollView.contentInsetAdjustmentBehavior = .never
        self.webView = wv
        let container = UIView()
        container.backgroundColor = .systemBackground
        container.addSubview(wv)
        NSLayoutConstraint.activate([
            wv.topAnchor.constraint(equalTo: container.topAnchor),
            wv.bottomAnchor.constraint(equalTo: container.bottomAnchor),
            wv.leadingAnchor.constraint(equalTo: container.leadingAnchor),
            wv.trailingAnchor.constraint(equalTo: container.trailingAnchor),
        ])
        self.view = container
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        loadContent()
    }

    private func loadContent() {
        // Prefer loadFileURL (data URL can be too large and delegate may not fire).
        if let url = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "public") {
            let dir = url.deletingLastPathComponent()
            print("START loading: \(url)")
            webView.loadFileURL(url, allowingReadAccessTo: dir)
            return
        }
        if let path = Bundle.main.path(forResource: "index", ofType: "html", inDirectory: "public") {
            let dir = URL(fileURLWithPath: path).deletingLastPathComponent()
            let fileURL = dir.appendingPathComponent("index.html")
            print("START loading: \(fileURL)")
            webView.loadFileURL(fileURL, allowingReadAccessTo: dir)
            return
        }
        if let resourcePath = Bundle.main.resourcePath {
            let publicDir = URL(fileURLWithPath: resourcePath).appendingPathComponent("public", isDirectory: true)
            let indexURL = publicDir.appendingPathComponent("index.html")
            if FileManager.default.fileExists(atPath: indexURL.path) {
                print("START loading: \(indexURL)")
                webView.loadFileURL(indexURL, allowingReadAccessTo: publicDir)
                return
            }
            let rootIndex = URL(fileURLWithPath: resourcePath).appendingPathComponent("index.html")
            if FileManager.default.fileExists(atPath: rootIndex.path) {
                print("START loading: \(rootIndex)")
                webView.loadFileURL(rootIndex, allowingReadAccessTo: URL(fileURLWithPath: resourcePath))
                return
            }
        }
        // No bundle file: show in-app fallback and report so UI can show error.
        print("START loading: (fallback HTML - bundle index.html not found)")
        let html = """
        <!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
        <body style="margin:0;padding:20px;font-family:system-ui;background:#1a1f2e;color:#fff;min-height:100vh">
        <h1>Content not found</h1>
        <p>Add the <b>public</b> folder to the App target → Copy Bundle Resources.</p>
        </body></html>
        """
        webView.loadHTMLString(html, baseURL: Bundle.main.bundleURL)
    }

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        print("FINISH loading")
        DispatchQueue.main.async { [weak self] in
            self?.onLoadFinished()
        }
    }

    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        let msg = error.localizedDescription
        print("FAIL loading: \(msg)")
        DispatchQueue.main.async { [weak self] in
            self?.onLoadFailed(msg)
        }
    }

    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
        let msg = error.localizedDescription
        print("FAIL loading: \(msg)")
        DispatchQueue.main.async { [weak self] in
            self?.onLoadFailed(msg)
        }
    }
}

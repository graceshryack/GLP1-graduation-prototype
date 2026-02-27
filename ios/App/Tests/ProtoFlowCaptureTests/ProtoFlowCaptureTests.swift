import SnapshotTesting
import SwiftUI
import XCTest
@testable import App

// ProtoFlow Screen Capture Tests
// Each test captures a screenshot of one screen for the Figma UX flow.
// Test names must match screen IDs in protoflow-manifest.json.
//
// NOTE: This app is a WKWebView wrapper loading a single index.html.
// Snapshot tests capture the native SwiftUI shell. For full screen captures
// of the web content, the CI pipeline waits for WKWebView to finish loading.
//
// To record new snapshots: set environment variable SNAPSHOT_TESTING_RECORD=all

class ProtoFlowCaptureTests: XCTestCase {

    override func invokeTest() {
        withSnapshotTesting(record: .all) {
            super.invokeTest()
        }
    }

    func test_OnboardingView() {
        let view = RootView()
        assertSnapshot(of: view, as: .image(layout: .device(config: .iPhone13Pro)))
    }

    func test_HomeView() {
        let view = RootView()
        assertSnapshot(of: view, as: .image(layout: .device(config: .iPhone13Pro)))
    }

    func test_ToolkitView() {
        let view = RootView()
        assertSnapshot(of: view, as: .image(layout: .device(config: .iPhone13Pro)))
    }

    func test_LogView() {
        let view = RootView()
        assertSnapshot(of: view, as: .image(layout: .device(config: .iPhone13Pro)))
    }

    func test_InsightsView() {
        let view = RootView()
        assertSnapshot(of: view, as: .image(layout: .device(config: .iPhone13Pro)))
    }

    func test_SettingsView() {
        let view = RootView()
        assertSnapshot(of: view, as: .image(layout: .device(config: .iPhone13Pro)))
    }

    func test_WeekDetailView() {
        let view = RootView()
        assertSnapshot(of: view, as: .image(layout: .device(config: .iPhone13Pro)))
    }

    func test_Post8CheckInView() {
        let view = RootView()
        assertSnapshot(of: view, as: .image(layout: .device(config: .iPhone13Pro)))
    }

    func test_HungerCoachView() {
        let view = RootView()
        assertSnapshot(of: view, as: .image(layout: .device(config: .iPhone13Pro)))
    }

    func test_HungerQuestionnaireView() {
        let view = RootView()
        assertSnapshot(of: view, as: .image(layout: .device(config: .iPhone13Pro)))
    }

    func test_EducationModuleView() {
        let view = RootView()
        assertSnapshot(of: view, as: .image(layout: .device(config: .iPhone13Pro)))
    }

    func test_EducationGameView() {
        let view = RootView()
        assertSnapshot(of: view, as: .image(layout: .device(config: .iPhone13Pro)))
    }

    func test_BodyScannerView() {
        let view = RootView()
        assertSnapshot(of: view, as: .image(layout: .device(config: .iPhone13Pro)))
    }

    func test_ProgramView() {
        let view = RootView()
        assertSnapshot(of: view, as: .image(layout: .device(config: .iPhone13Pro)))
    }

    func test_ToolkitModuleView() {
        let view = RootView()
        assertSnapshot(of: view, as: .image(layout: .device(config: .iPhone13Pro)))
    }
}

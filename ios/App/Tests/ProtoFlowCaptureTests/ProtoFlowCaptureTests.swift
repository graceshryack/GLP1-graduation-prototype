import XCTest
import SnapshotTesting
import SwiftUI
@testable import App

final class ProtoFlowCaptureTests: XCTestCase {
    let layout = SwiftUISnapshotLayout.device(config: .iPhone13Pro)

    func test_Onboarding_Welcome() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_Onboarding_NameAge() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_Onboarding_Medication() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_Onboarding_WhyOffGLP1() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_Onboarding_BodyActivity() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_Onboarding_Goals() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_Onboarding_PreStruggles() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_Onboarding_CurrentStruggles() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_Onboarding_StrengthTraining() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_Onboarding_AssessmentQ1() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_Onboarding_AssessmentQ5() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_Onboarding_PersonalizedProgram() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_Home_CGM_Active() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_Home_CGM_Off() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_Toolkit_Main() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_WeekDetail_Block1_Baseline() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_WeekDetail_Block2_Nutrition() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_WeekDetail_Block3_Movement() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_WeekDetail_Block4_FullSystem() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_WeekDetail_Block5_Locked() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_Assessment_Baseline_Intro() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_Assessment_MidProgram_Intro() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_Assessment_Post8_Intro() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_CheckIn_SelfAssessment() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_CheckIn_Feedback() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_CheckIn_FocusSelection() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_Log_Main() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerQuestionnaire() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_Landing() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_Scenario_StillHungry() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_StillHungry_Under15() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_StillHungry_WhatAte() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_StillHungry_CarbHeavy() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_StillHungry_Balanced() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_StillHungry_StomachVsMouth() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_StillHungry_Physical() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_StillHungry_MouthHunger() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_Scenario_Starving() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_Starving_LongAgo() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_Starving_Recent() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_Starving_Morning() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_Scenario_Craving() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_Craving_Sweet() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_Craving_Salty() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_Craving_Rich() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_Craving_Specific() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_Scenario_NotHungry() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_HALT_Hungry() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_HALT_Angry() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_HALT_Lonely() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_HALT_Tired() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_Scenario_Unsure() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_BodyScan_Results() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_BodyScan_Physical() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_BodyScan_BoringFood() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_BodyScan_Craving() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_BodyScan_StillUnsure() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_Scenario_UnusualTime() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_UnusualTime_LateNight() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_UnusualTime_Afternoon() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_UnusualTime_EarlyMorning() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_UnusualTime_PostWorkout() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_Scenario_AboutToEat() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_AboutToEat_Low() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_AboutToEat_SweetSpot() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_AboutToEat_High() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_Scenario_PostMeal() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_PostMeal_JustRight() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_PostMeal_TooFull() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_PostMeal_NotSure() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_PostMeal_StillHungry() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_PostMealHungry_LowProtein() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_PostMealHungry_SmallPortion() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_PostMealHungry_AteFast() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_PostMealHungry_BalancedMeal() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_Scenario_HungerChanging() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_HungerChanging_MoreHungry() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_HungerChanging_LessHungry() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_HungerChanging_Unpredictable() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_HungerChanging_DifferentType() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_Scenario_TeachMe() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_Outcome_Paused() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_Outcome_AteIntentional() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_Outcome_Satisfied() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_HungerCoach_Outcome_LearnMore() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_WeeklyCheckin() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_Insights_Lifestyle() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_Insights_Glucose() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_Insights_Graduation() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_Education_CGM_Basics() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_Education_Protein_Anchor() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_Education_Walking_Glucose() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_Game_ProteinGuess() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_Game_BuildBalancedPlate() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_Settings() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_Program_Details() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }

    func test_BodyScanner() {
        assertSnapshot(of: RootView(), as: .image(layout: layout))
    }
}

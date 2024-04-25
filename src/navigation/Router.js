import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import Tabs from "./Tab";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ForgetPassScreen from "../screens/ForgetPassScreen";
import LearnWordScreen from "../screens/LearnWordScreen";
import TestWordScreen from "../screens/TestWordScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ReadingScreen from "../screens/ReadingScreen";
import TextScreen from "../screens/TextScreen";
import ChangePictureScreen from "../screens/ChangePicture";
import NewPasswordScreen from "../screens/NewPasswordScreen";
import ReAuthScreen from "../screens/ReAuthScreen";
import CreateListScreen from "../screens/CreateListScreen";
import MyListScreen from "../screens/MyListScreen";
import ExitExcScreen from "../screens/ExitExcScreen";
import EditListScreen from "../screens/EditListScreen";
import PublicListScreen from "../screens/PublicListsScreen";
import TermsScreen from "../screens/TermsScreen";
import Class1x1x1 from "../screens/ClassScreens/LearningScreens/Class1x1/Class1x1x1";
import Class1x1x2 from "../screens/ClassScreens/LearningScreens/Class1x1/Class1x1x2";
import Class1x1x3 from "../screens/ClassScreens/LearningScreens/Class1x1/Class1x1x3";
import Class1x1x4 from "../screens/ClassScreens/LearningScreens/Class1x1/Class1x1x4";
import Class1x1x5 from "../screens/ClassScreens/LearningScreens/Class1x1/Class1x1x5";
import Class1x1x6 from "../screens/ClassScreens/LearningScreens/Class1x1/Class1x1x6";
import Class1x1x7 from "../screens/ClassScreens/LearningScreens/Class1x1/Class1x1x7";
import Class1x1x8 from "../screens/ClassScreens/LearningScreens/Class1x1/Class1x1x8";
import Class1x1x9 from "../screens/ClassScreens/LearningScreens/Class1x1/Class1x1x9";
import Class1x1x10 from "../screens/ClassScreens/LearningScreens/Class1x1/Class1x1x10";
import Class1x2x1 from "../screens/ClassScreens/LearningScreens/Class1x2/Class1x2x1";
import Class1x2x2 from "../screens/ClassScreens/LearningScreens/Class1x2/Class1x2x2";
import Class1x2x3 from "../screens/ClassScreens/LearningScreens/Class1x2/Class1x2x3";
import Class1x2x4 from "../screens/ClassScreens/LearningScreens/Class1x2/Class1x2x4";
import Class1x2x5 from "../screens/ClassScreens/LearningScreens/Class1x2/Class1x2x5";
import Class1x2x6 from "../screens/ClassScreens/LearningScreens/Class1x2/Class1x2x6";
import Class1x2x7 from "../screens/ClassScreens/LearningScreens/Class1x2/Class1x2x7";
import Class1x2x8 from "../screens/ClassScreens/LearningScreens/Class1x2/Class1x2x8";
import Class1x2x9 from "../screens/ClassScreens/LearningScreens/Class1x2/Class1x2x9";
import Class1x3x1 from "../screens/ClassScreens/LearningScreens/Class1x3/Class1x3x1";
import Class1x3x2 from "../screens/ClassScreens/LearningScreens/Class1x3/Class1x3x2";
import Class1x3x3 from "../screens/ClassScreens/LearningScreens/Class1x3/Class1x3x3";
import Class1x3x4 from "../screens/ClassScreens/LearningScreens/Class1x3/Class1x3x4";
import Class1x3x5 from "../screens/ClassScreens/LearningScreens/Class1x3/Class1x3x5";
import Class1x3x6 from "../screens/ClassScreens/LearningScreens/Class1x3/Class1x3x6";
import Class1x3x7 from "../screens/ClassScreens/LearningScreens/Class1x3/Class1x3x7";
import Class1x3x8 from "../screens/ClassScreens/LearningScreens/Class1x3/Class1x3x8";
import Class1x3x9 from "../screens/ClassScreens/LearningScreens/Class1x3/Class1x3x9";
import Class1x3x10 from "../screens/ClassScreens/LearningScreens/Class1x3/Class1x3x10";
import Class1x3x11 from "../screens/ClassScreens/LearningScreens/Class1x3/Class1x3x11";
import Class1x3x12 from "../screens/ClassScreens/LearningScreens/Class1x3/Class1x3x12";
import Class1x4x1 from "../screens/ClassScreens/LearningScreens/Class1x4/Class1x4x1";
import Class1x4x2 from "../screens/ClassScreens/LearningScreens/Class1x4/Class1x4x2";
import Class1x4x3 from "../screens/ClassScreens/LearningScreens/Class1x4/Class1x4x3";
import Class1x4x4 from "../screens/ClassScreens/LearningScreens/Class1x4/Class1x4x4";
import Class1x4x5 from "../screens/ClassScreens/LearningScreens/Class1x4/Class1x4x5";
import Class1x4x6 from "../screens/ClassScreens/LearningScreens/Class1x4/Class1x4x6";
import Class1x4x7 from "../screens/ClassScreens/LearningScreens/Class1x4/Class1x4x7";
import Class1x4x8 from "../screens/ClassScreens/LearningScreens/Class1x4/Class1x4x8";
import Class1x4x9 from "../screens/ClassScreens/LearningScreens/Class1x4/Class1x4x9";
import Class1x4x10 from "../screens/ClassScreens/LearningScreens/Class1x4/Class1x4x10";
import Class1x4x11 from "../screens/ClassScreens/LearningScreens/Class1x4/Class1x4x11";
import Class1x4x12 from "../screens/ClassScreens/LearningScreens/Class1x4/Class1x4x12";
import Class1x4x13 from "../screens/ClassScreens/LearningScreens/Class1x4/Class1x4x13";
import Class1x5x1 from "../screens/ClassScreens/LearningScreens/Class1x5/Class1x5x1";
import Class1x5x2 from "../screens/ClassScreens/LearningScreens/Class1x5/Class1x5x2";
import Class1x5x3 from "../screens/ClassScreens/LearningScreens/Class1x5/Class1x5x3";
import Class1x5x4 from "../screens/ClassScreens/LearningScreens/Class1x5/Class1x5x4";
import Class1x5x5 from "../screens/ClassScreens/LearningScreens/Class1x5/Class1x5x5";
import Class1x5x6 from "../screens/ClassScreens/LearningScreens/Class1x5/Class1x5x6";
import Class1x5x7 from "../screens/ClassScreens/LearningScreens/Class1x5/Class1x5x7";
import Class1x5x8 from "../screens/ClassScreens/LearningScreens/Class1x5/Class1x5x8";
import Class1x5x9 from "../screens/ClassScreens/LearningScreens/Class1x5/Class1x5x9";
import Class2x1x1 from "../screens/ClassScreens/LearningScreens/Class2x1/Class2x1x1";
import Class2x1x2 from "../screens/ClassScreens/LearningScreens/Class2x1/Class2x1x2";
import Class2x1x3 from "../screens/ClassScreens/LearningScreens/Class2x1/Class2x1x3";
import Class2x1x4 from "../screens/ClassScreens/LearningScreens/Class2x1/Class2x1x4";
import Class2x1x5 from "../screens/ClassScreens/LearningScreens/Class2x1/Class2x1x5";
import Class2x1x6 from "../screens/ClassScreens/LearningScreens/Class2x1/Class2x1x6";
import Class2x1x7 from "../screens/ClassScreens/LearningScreens/Class2x1/Class2x1x7";
import Class2x1x8 from "../screens/ClassScreens/LearningScreens/Class2x1/Class2x1x8";
import Class2x1x9 from "../screens/ClassScreens/LearningScreens/Class2x1/Class2x1x9";
import Class2x1x10 from "../screens/ClassScreens/LearningScreens/Class2x1/Class2x1x10";
import Class2x1x11 from "../screens/ClassScreens/LearningScreens/Class2x1/Class2x1x11";
import Class2x2x1 from "../screens/ClassScreens/LearningScreens/Class2x2/Class2x2x1";
import Class2x2x2 from "../screens/ClassScreens/LearningScreens/Class2x2/Class2x2x2";
import Class2x2x3 from "../screens/ClassScreens/LearningScreens/Class2x2/Class2x2x3";
import Class2x2x4 from "../screens/ClassScreens/LearningScreens/Class2x2/Class2x2x4";
import Class2x2x5 from "../screens/ClassScreens/LearningScreens/Class2x2/Class2x2x5";
import Class2x2x6 from "../screens/ClassScreens/LearningScreens/Class2x2/Class2x2x6";
import Class2x2x7 from "../screens/ClassScreens/LearningScreens/Class2x2/Class2x2x7";
import Class2x2x8 from "../screens/ClassScreens/LearningScreens/Class2x2/Class2x2x8";
import Class2x2x9 from "../screens/ClassScreens/LearningScreens/Class2x2/Class2x2x9";
import Class2x2x10 from "../screens/ClassScreens/LearningScreens/Class2x2/Class2x2x10";
import Class2x2x11 from "../screens/ClassScreens/LearningScreens/Class2x2/Class2x2x11";
import Class2x3x1 from "../screens/ClassScreens/LearningScreens/Class2x3/Class2x3x1";
import Class2x3x2 from "../screens/ClassScreens/LearningScreens/Class2x3/Class2x3x2";
import Class2x3x3 from "../screens/ClassScreens/LearningScreens/Class2x3/Class2x3x3";
import Class2x3x4 from "../screens/ClassScreens/LearningScreens/Class2x3/Class2x3x4";
import Class2x3x5 from "../screens/ClassScreens/LearningScreens/Class2x3/Class2x3x5";
import Class2x3x6 from "../screens/ClassScreens/LearningScreens/Class2x3/Class2x3x6";
import Class2x3x7 from "../screens/ClassScreens/LearningScreens/Class2x3/Class2x3x7";
import Class2x3x8 from "../screens/ClassScreens/LearningScreens/Class2x3/Class2x3x8";
import Class2x3x9 from "../screens/ClassScreens/LearningScreens/Class2x3/Class2x3x9";
import Class2x3x10 from "../screens/ClassScreens/LearningScreens/Class2x3/Class2x3x10";
import Class2x3x11 from "../screens/ClassScreens/LearningScreens/Class2x3/Class2x3x11";
import Class2x3x12 from "../screens/ClassScreens/LearningScreens/Class2x3/Class2x3x12";
import Class2x4x1 from "../screens/ClassScreens/LearningScreens/Class2x4/Class2x4x1";
import Class2x4x2 from "../screens/ClassScreens/LearningScreens/Class2x4/Class2x4x2";
import Class2x4x3 from "../screens/ClassScreens/LearningScreens/Class2x4/Class2x4x3";
import Class2x4x4 from "../screens/ClassScreens/LearningScreens/Class2x4/Class2x4x4";
import Class2x4x5 from "../screens/ClassScreens/LearningScreens/Class2x4/Class2x4x5";
import Class2x4x6 from "../screens/ClassScreens/LearningScreens/Class2x4/Class2x4x6";
import Class2x4x7 from "../screens/ClassScreens/LearningScreens/Class2x4/Class2x4x7";
import Class2x4x8 from "../screens/ClassScreens/LearningScreens/Class2x4/Class2x4x8";
import Class2x4x9 from "../screens/ClassScreens/LearningScreens/Class2x4/Class2x4x9";
import Class2x4x10 from "../screens/ClassScreens/LearningScreens/Class2x4/Class2x4x10";
import Class2x4x11 from "../screens/ClassScreens/LearningScreens/Class2x4/Class2x4x11";
import Class2x5x1 from "../screens/ClassScreens/LearningScreens/Class2x5/Class2x5x1";
import Class2x5x2 from "../screens/ClassScreens/LearningScreens/Class2x5/Class2x5x2";
import Class2x5x3 from "../screens/ClassScreens/LearningScreens/Class2x5/Class2x5x3";
import Class2x5x4 from "../screens/ClassScreens/LearningScreens/Class2x5/Class2x5x4";
import Class2x5x5 from "../screens/ClassScreens/LearningScreens/Class2x5/Class2x5x5";
import Class2x5x6 from "../screens/ClassScreens/LearningScreens/Class2x5/Class2x5x6";
import Class2x5x7 from "../screens/ClassScreens/LearningScreens/Class2x5/Class2x5x7";
import Class2x5x8 from "../screens/ClassScreens/LearningScreens/Class2x5/Class2x5x8";
import Class2x6x1 from "../screens/ClassScreens/LearningScreens/Class2x6/Class2x6x1";
import Class2x6x2 from "../screens/ClassScreens/LearningScreens/Class2x6/Class2x6x2";
import Class2x6x3 from "../screens/ClassScreens/LearningScreens/Class2x6/Class2x6x3";
import Class2x6x4 from "../screens/ClassScreens/LearningScreens/Class2x6/Class2x6x4";
import Class2x6x5 from "../screens/ClassScreens/LearningScreens/Class2x6/Class2x6x5";
import Class2x6x6 from "../screens/ClassScreens/LearningScreens/Class2x6/Class2x6x6";
import Class2x6x7 from "../screens/ClassScreens/LearningScreens/Class2x6/Class2x6x7";
import Class2x6x8 from "../screens/ClassScreens/LearningScreens/Class2x6/Class2x6x8";
import Class2x6x9 from "../screens/ClassScreens/LearningScreens/Class2x6/Class2x6x9";
import Class2x6x10 from "../screens/ClassScreens/LearningScreens/Class2x6/Class2x6x10";
import Class2x6x11 from "../screens/ClassScreens/LearningScreens/Class2x6/Class2x6x11";
import Class2x7x1 from "../screens/ClassScreens/LearningScreens/Class2x7/Class2x7x1";
import Class2x7x2 from "../screens/ClassScreens/LearningScreens/Class2x7/Class2x7x2";
import Class2x7x3 from "../screens/ClassScreens/LearningScreens/Class2x7/Class2x7x3";
import Class2x7x4 from "../screens/ClassScreens/LearningScreens/Class2x7/Class2x7x4";
import Class2x7x5 from "../screens/ClassScreens/LearningScreens/Class2x7/Class2x7x5";
import Class2x7x6 from "../screens/ClassScreens/LearningScreens/Class2x7/Class2x7x6";
import Class2x7x7 from "../screens/ClassScreens/LearningScreens/Class2x7/Class2x7x7";
import Class2x7x8 from "../screens/ClassScreens/LearningScreens/Class2x7/Class2x7x8";
import Class2x7x9 from "../screens/ClassScreens/LearningScreens/Class2x7/Class2x7x9";
import Class2x7x10 from "../screens/ClassScreens/LearningScreens/Class2x7/Class2x7x10";
import Class3x1x1 from "../screens/ClassScreens/LearningScreens/Class3x1/Class3x1x1";
import Class3x1x2 from "../screens/ClassScreens/LearningScreens/Class3x1/Class3x1x2";
import Class3x1x3 from "../screens/ClassScreens/LearningScreens/Class3x1/Class3x1x3";
import Class3x1x4 from "../screens/ClassScreens/LearningScreens/Class3x1/Class3x1x4";
import Class3x1x5 from "../screens/ClassScreens/LearningScreens/Class3x1/Class3x1x5";
import Class3x1x6 from "../screens/ClassScreens/LearningScreens/Class3x1/Class3x1x6";
import Class3x1x7 from "../screens/ClassScreens/LearningScreens/Class3x1/Class3x1x7";
import Class3x1x8 from "../screens/ClassScreens/LearningScreens/Class3x1/Class3x1x8";
import Class3x1x9 from "../screens/ClassScreens/LearningScreens/Class3x1/Class3x1x9";
import Class3x1x10 from "../screens/ClassScreens/LearningScreens/Class3x1/Class3x1x10";
import Class3x1x11 from "../screens/ClassScreens/LearningScreens/Class3x1/Class3x1x11";
import Class3x2x1 from "../screens/ClassScreens/LearningScreens/Class3x2/Class3x2x1";
import Class3x2x2 from "../screens/ClassScreens/LearningScreens/Class3x2/Class3x2x2";
import Class3x2x3 from "../screens/ClassScreens/LearningScreens/Class3x2/Class3x2x3";
import Class3x2x4 from "../screens/ClassScreens/LearningScreens/Class3x2/Class3x2x4";
import Class3x2x5 from "../screens/ClassScreens/LearningScreens/Class3x2/Class3x2x5";
import Class3x2x6 from "../screens/ClassScreens/LearningScreens/Class3x2/Class3x2x6";
import Class3x3x1 from "../screens/ClassScreens/LearningScreens/Class3x3/Class3x3x1";
import Class3x3x2 from "../screens/ClassScreens/LearningScreens/Class3x3/Class3x3x2";
import Class3x3x3 from "../screens/ClassScreens/LearningScreens/Class3x3/Class3x3x3";
import Class3x3x4 from "../screens/ClassScreens/LearningScreens/Class3x3/Class3x3x4";
import Class3x3x5 from "../screens/ClassScreens/LearningScreens/Class3x3/Class3x3x5";
import Class3x3x6 from "../screens/ClassScreens/LearningScreens/Class3x3/Class3x3x6";
import Class3x3x7 from "../screens/ClassScreens/LearningScreens/Class3x3/Class3x3x7";
import Class3x3x8 from "../screens/ClassScreens/LearningScreens/Class3x3/Class3x3x8";
import Class3x3x9 from "../screens/ClassScreens/LearningScreens/Class3x3/Class3x3x9";
import Class3x3x10 from "../screens/ClassScreens/LearningScreens/Class3x3/Class3x3x10";
import Class3x4x1 from "../screens/ClassScreens/LearningScreens/Class3x4/Class3x4x1";
import Class3x4x2 from "../screens/ClassScreens/LearningScreens/Class3x4/Class3x4x2";
import Class3x4x3 from "../screens/ClassScreens/LearningScreens/Class3x4/Class3x4x3";
import Class3x4x4 from "../screens/ClassScreens/LearningScreens/Class3x4/Class3x4x4";
import Class3x4x5 from "../screens/ClassScreens/LearningScreens/Class3x4/Class3x4x5";
import Class3x4x6 from "../screens/ClassScreens/LearningScreens/Class3x4/Class3x4x6";
import Class3x4x7 from "../screens/ClassScreens/LearningScreens/Class3x4/Class3x4x7";
import Class3x4x8 from "../screens/ClassScreens/LearningScreens/Class3x4/Class3x4x8";
import Class3x4x9 from "../screens/ClassScreens/LearningScreens/Class3x4/Class3x4x9";
import Class3x5x1 from "../screens/ClassScreens/LearningScreens/Class3x5/Class3x5x1";
import Class3x5x2 from "../screens/ClassScreens/LearningScreens/Class3x5/Class3x5x2";
import Class3x5x3 from "../screens/ClassScreens/LearningScreens/Class3x5/Class3x5x3";
import Class3x5x4 from "../screens/ClassScreens/LearningScreens/Class3x5/Class3x5x4";
import Class3x5x5 from "../screens/ClassScreens/LearningScreens/Class3x5/Class3x5x5";
import Class3x5x6 from "../screens/ClassScreens/LearningScreens/Class3x5/Class3x5x6";
import Class3x5x7 from "../screens/ClassScreens/LearningScreens/Class3x5/Class3x5x7";
import Class3x5x8 from "../screens/ClassScreens/LearningScreens/Class3x5/Class3x5x8";
import Class3x5x9 from "../screens/ClassScreens/LearningScreens/Class3x5/Class3x5x9";
import Class3x5x10 from "../screens/ClassScreens/LearningScreens/Class3x5/Class3x5x10";
import Class4x1x1 from "../screens/ClassScreens/LearningScreens/Class4x1/Class4x1x1";
import Class4x1x2 from "../screens/ClassScreens/LearningScreens/Class4x1/Class4x1x2";
import Class4x1x3 from "../screens/ClassScreens/LearningScreens/Class4x1/Class4x1x3";
import Class4x1x4 from "../screens/ClassScreens/LearningScreens/Class4x1/Class4x1x4";
import Class4x1x5 from "../screens/ClassScreens/LearningScreens/Class4x1/Class4x1x5";
import Class4x1x6 from "../screens/ClassScreens/LearningScreens/Class4x1/Class4x1x6";
import Class4x1x7 from "../screens/ClassScreens/LearningScreens/Class4x1/Class4x1x7";
import Class4x1x8 from "../screens/ClassScreens/LearningScreens/Class4x1/Class4x1x8";
import Class4x1x9 from "../screens/ClassScreens/LearningScreens/Class4x1/Class4x1x9";
import Class4x1x10 from "../screens/ClassScreens/LearningScreens/Class4x1/Class4x1x10";
import Class4x1x11 from "../screens/ClassScreens/LearningScreens/Class4x1/Class4x1x11";
import Class4x1x12 from "../screens/ClassScreens/LearningScreens/Class4x1/Class4x1x12";
import Class4x1x13 from "../screens/ClassScreens/LearningScreens/Class4x1/Class4x1x13";
import Class4x2x1 from "../screens/ClassScreens/LearningScreens/Class4x2/Class4x2x1";
import Class4x2x2 from "../screens/ClassScreens/LearningScreens/Class4x2/Class4x2x2";
import Class4x2x3 from "../screens/ClassScreens/LearningScreens/Class4x2/Class4x2x3";
import Class4x2x4 from "../screens/ClassScreens/LearningScreens/Class4x2/Class4x2x4";
import Class4x2x5 from "../screens/ClassScreens/LearningScreens/Class4x2/Class4x2x5";
import Class4x2x6 from "../screens/ClassScreens/LearningScreens/Class4x2/Class4x2x6";
import Class4x2x7 from "../screens/ClassScreens/LearningScreens/Class4x2/Class4x2x7";
import Class4x2x8 from "../screens/ClassScreens/LearningScreens/Class4x2/Class4x2x8";
import Class4x3x1 from "../screens/ClassScreens/LearningScreens/Class4x3/Class4x3x1";
import Class4x3x2 from "../screens/ClassScreens/LearningScreens/Class4x3/Class4x3x2";
import Class4x3x3 from "../screens/ClassScreens/LearningScreens/Class4x3/Class4x3x3";
import Class4x3x4 from "../screens/ClassScreens/LearningScreens/Class4x3/Class4x3x4";
import Class4x3x5 from "../screens/ClassScreens/LearningScreens/Class4x3/Class4x3x5";
import Class4x3x6 from "../screens/ClassScreens/LearningScreens/Class4x3/Class4x3x6";
import Class4x3x7 from "../screens/ClassScreens/LearningScreens/Class4x3/Class4x3x7";
import Class4x4x1 from "../screens/ClassScreens/LearningScreens/Class4x4/Class4x4x1";
import Class4x4x2 from "../screens/ClassScreens/LearningScreens/Class4x4/Class4x4x2";
import Class4x4x3 from "../screens/ClassScreens/LearningScreens/Class4x4/Class4x4x3";
import Class4x4x4 from "../screens/ClassScreens/LearningScreens/Class4x4/Class4x4x4";
import Class4x4x5 from "../screens/ClassScreens/LearningScreens/Class4x4/Class4x4x5";
import Class4x4x6 from "../screens/ClassScreens/LearningScreens/Class4x4/Class4x4x6";
import Class4x4x7 from "../screens/ClassScreens/LearningScreens/Class4x4/Class4x4x7";
import Class4x4x8 from "../screens/ClassScreens/LearningScreens/Class4x4/Class4x4x8";
import Class4x4x9 from "../screens/ClassScreens/LearningScreens/Class4x4/Class4x4x9";
import Class4x4x10 from "../screens/ClassScreens/LearningScreens/Class4x4/Class4x4x10";
import Class4x5x1 from "../screens/ClassScreens/LearningScreens/Class4x5/Class4x5x1";
import Class4x5x2 from "../screens/ClassScreens/LearningScreens/Class4x5/Class4x5x2";
import Class4x5x3 from "../screens/ClassScreens/LearningScreens/Class4x5/Class4x5x3";
import Class4x5x4 from "../screens/ClassScreens/LearningScreens/Class4x5/Class4x5x4";
import Class4x5x5 from "../screens/ClassScreens/LearningScreens/Class4x5/Class4x5x5";
import Class4x5x6 from "../screens/ClassScreens/LearningScreens/Class4x5/Class4x5x6";
import Class4x5x7 from "../screens/ClassScreens/LearningScreens/Class4x5/Class4x5x7";
import Class4x5x8 from "../screens/ClassScreens/LearningScreens/Class4x5/Class4x5x8";
import Class4x5x9 from "../screens/ClassScreens/LearningScreens/Class4x5/Class4x5x9";
import Class4x6x1 from "../screens/ClassScreens/LearningScreens/Class4x6/Class4x6x1";
import Class4x6x2 from "../screens/ClassScreens/LearningScreens/Class4x6/Class4x6x2";
import Class4x6x3 from "../screens/ClassScreens/LearningScreens/Class4x6/Class4x6x3";
import Class4x6x4 from "../screens/ClassScreens/LearningScreens/Class4x6/Class4x6x4";
import Class4x6x5 from "../screens/ClassScreens/LearningScreens/Class4x6/Class4x6x5";
import Class4x6x6 from "../screens/ClassScreens/LearningScreens/Class4x6/Class4x6x6";
import Class4x6x7 from "../screens/ClassScreens/LearningScreens/Class4x6/Class4x6x7";
import Class4x6x8 from "../screens/ClassScreens/LearningScreens/Class4x6/Class4x6x8";
import Class4x6x9 from "../screens/ClassScreens/LearningScreens/Class4x6/Class4x6x9";
import Class5x1x1 from "../screens/ClassScreens/LearningScreens/Class5x1/Class5x1x1";
import Class5x1x2 from "../screens/ClassScreens/LearningScreens/Class5x1/Class5x1x2";
import Class5x1x3 from "../screens/ClassScreens/LearningScreens/Class5x1/Class5x1x3";
import Class5x1x4 from "../screens/ClassScreens/LearningScreens/Class5x1/Class5x1x4";
import Class5x1x5 from "../screens/ClassScreens/LearningScreens/Class5x1/Class5x1x5";
import Class5x1x6 from "../screens/ClassScreens/LearningScreens/Class5x1/Class5x1x6";
import Class5x1x7 from "../screens/ClassScreens/LearningScreens/Class5x1/Class5x1x7";
import Class5x1x8 from "../screens/ClassScreens/LearningScreens/Class5x1/Class5x1x8";
import Class5x1x9 from "../screens/ClassScreens/LearningScreens/Class5x1/Class5x1x9";
import Class5x1x10 from "../screens/ClassScreens/LearningScreens/Class5x1/Class5x1x10";
import Class5x2x1 from "../screens/ClassScreens/LearningScreens/Class5x2/Class5x2x1";
import Class5x2x2 from "../screens/ClassScreens/LearningScreens/Class5x2/Class5x2x2";
import Class5x2x3 from "../screens/ClassScreens/LearningScreens/Class5x2/Class5x2x3";
import Class5x2x4 from "../screens/ClassScreens/LearningScreens/Class5x2/Class5x2x4";
import Class5x2x5 from "../screens/ClassScreens/LearningScreens/Class5x2/Class5x2x5";
import Class5x2x6 from "../screens/ClassScreens/LearningScreens/Class5x2/Class5x2x6";
import Class5x2x7 from "../screens/ClassScreens/LearningScreens/Class5x2/Class5x2x7";
import Class5x2x8 from "../screens/ClassScreens/LearningScreens/Class5x2/Class5x2x8";
import Class5x2x9 from "../screens/ClassScreens/LearningScreens/Class5x2/Class5x2x9";
import Class5x2x10 from "../screens/ClassScreens/LearningScreens/Class5x2/Class5x2x10";
import Class5x2x11 from "../screens/ClassScreens/LearningScreens/Class5x2/Class5x2x11";
import Class5x2x12 from "../screens/ClassScreens/LearningScreens/Class5x2/Class5x2x12";
import Class5x2x13 from "../screens/ClassScreens/LearningScreens/Class5x2/Class5x2x13";
import Class5x3x1 from "../screens/ClassScreens/LearningScreens/Class5x3/Class5x3x1";
import Class5x3x2 from "../screens/ClassScreens/LearningScreens/Class5x3/Class5x3x2";
import Class5x3x3 from "../screens/ClassScreens/LearningScreens/Class5x3/Class5x3x3";
import Class5x3x4 from "../screens/ClassScreens/LearningScreens/Class5x3/Class5x3x4";
import Class5x3x5 from "../screens/ClassScreens/LearningScreens/Class5x3/Class5x3x5";
import Class5x3x6 from "../screens/ClassScreens/LearningScreens/Class5x3/Class5x3x6";
import Class5x3x7 from "../screens/ClassScreens/LearningScreens/Class5x3/Class5x3x7";
import Class5x3x8 from "../screens/ClassScreens/LearningScreens/Class5x3/Class5x3x8";
import Class5x3x9 from "../screens/ClassScreens/LearningScreens/Class5x3/Class5x3x9";
import Class5x3x10 from "../screens/ClassScreens/LearningScreens/Class5x3/Class5x3x10";
import Class5x3x11 from "../screens/ClassScreens/LearningScreens/Class5x3/Class5x3x11";
import Class5x3x12 from "../screens/ClassScreens/LearningScreens/Class5x3/Class5x3x12";
import Class5x4x1 from "../screens/ClassScreens/LearningScreens/Class5x4/Class5x4x1";
import Class5x4x2 from "../screens/ClassScreens/LearningScreens/Class5x4/Class5x4x2";
import Class5x4x3 from "../screens/ClassScreens/LearningScreens/Class5x4/Class5x4x3";
import Class5x4x4 from "../screens/ClassScreens/LearningScreens/Class5x4/Class5x4x4";
import Class5x4x5 from "../screens/ClassScreens/LearningScreens/Class5x4/Class5x4x5";
import Class5x4x6 from "../screens/ClassScreens/LearningScreens/Class5x4/Class5x4x6";
import Class5x4x7 from "../screens/ClassScreens/LearningScreens/Class5x4/Class5x4x7";
import Class5x4x8 from "../screens/ClassScreens/LearningScreens/Class5x4/Class5x4x8";
import Class5x5x1 from "../screens/ClassScreens/LearningScreens/Class5x5/Class5x5x1";
import Class5x5x2 from "../screens/ClassScreens/LearningScreens/Class5x5/Class5x5x2";
import Class5x5x3 from "../screens/ClassScreens/LearningScreens/Class5x5/Class5x5x3";
import Class5x5x4 from "../screens/ClassScreens/LearningScreens/Class5x5/Class5x5x4";
import Class5x5x5 from "../screens/ClassScreens/LearningScreens/Class5x5/Class5x5x5";
import Class5x5x6 from "../screens/ClassScreens/LearningScreens/Class5x5/Class5x5x6";
import Class5x5x7 from "../screens/ClassScreens/LearningScreens/Class5x5/Class5x5x7";
import Class5x5x8 from "../screens/ClassScreens/LearningScreens/Class5x5/Class5x5x8";
import Class5x5x9 from "../screens/ClassScreens/LearningScreens/Class5x5/Class5x5x9";
import Class5x6x1 from "../screens/ClassScreens/LearningScreens/Class5x6/Class5x6x1";
import Class5x6x2 from "../screens/ClassScreens/LearningScreens/Class5x6/Class5x6x2";
import Class5x6x3 from "../screens/ClassScreens/LearningScreens/Class5x6/Class5x6x3";
import Class5x6x4 from "../screens/ClassScreens/LearningScreens/Class5x6/Class5x6x4";
import Class5x6x5 from "../screens/ClassScreens/LearningScreens/Class5x6/Class5x6x5";
import Class5x6x6 from "../screens/ClassScreens/LearningScreens/Class5x6/Class5x6x6";
import Class5x6x7 from "../screens/ClassScreens/LearningScreens/Class5x6/Class5x6x7";
import Class5x6x8 from "../screens/ClassScreens/LearningScreens/Class5x6/Class5x6x8";
import Class5x6x9 from "../screens/ClassScreens/LearningScreens/Class5x6/Class5x6x9";
import Class5x7x1 from "../screens/ClassScreens/LearningScreens/Class5x7/Class5x7x1";
import Class5x7x2 from "../screens/ClassScreens/LearningScreens/Class5x7/Class5x7x2";
import Class5x7x3 from "../screens/ClassScreens/LearningScreens/Class5x7/Class5x7x3";
import Class5x7x4 from "../screens/ClassScreens/LearningScreens/Class5x7/Class5x7x4";
import Class5x7x5 from "../screens/ClassScreens/LearningScreens/Class5x7/Class5x7x5";
import Class5x7x6 from "../screens/ClassScreens/LearningScreens/Class5x7/Class5x7x6";
import Class5x7x7 from "../screens/ClassScreens/LearningScreens/Class5x7/Class5x7x7";
import Class5x7x8 from "../screens/ClassScreens/LearningScreens/Class5x7/Class5x7x8";
import Class5x7x9 from "../screens/ClassScreens/LearningScreens/Class5x7/Class5x7x9";
import Class5x7x10 from "../screens/ClassScreens/LearningScreens/Class5x7/Class5x7x10";
import Class5x7x11 from "../screens/ClassScreens/LearningScreens/Class5x7/Class5x7x11";
import Class6x1x1 from "../screens/ClassScreens/LearningScreens/Class6x1/Class6x1x1";
import Class6x1x2 from "../screens/ClassScreens/LearningScreens/Class6x1/Class6x1x2";
import Class6x1x3 from "../screens/ClassScreens/LearningScreens/Class6x1/Class6x1x3";
import Class6x1x4 from "../screens/ClassScreens/LearningScreens/Class6x1/Class6x1x4";
import Class6x1x5 from "../screens/ClassScreens/LearningScreens/Class6x1/Class6x1x5";
import Class6x1x6 from "../screens/ClassScreens/LearningScreens/Class6x1/Class6x1x6";
import Class6x1x7 from "../screens/ClassScreens/LearningScreens/Class6x1/Class6x1x7";
import Class6x1x8 from "../screens/ClassScreens/LearningScreens/Class6x1/Class6x1x8";
import Class6x2x1 from "../screens/ClassScreens/LearningScreens/Class6x2/Class6x2x1";
import Class6x2x2 from "../screens/ClassScreens/LearningScreens/Class6x2/Class6x2x2";
import Class6x2x3 from "../screens/ClassScreens/LearningScreens/Class6x2/Class6x2x3";
import Class6x2x4 from "../screens/ClassScreens/LearningScreens/Class6x2/Class6x2x4";
import Class6x2x5 from "../screens/ClassScreens/LearningScreens/Class6x2/Class6x2x5";
import Class6x2x6 from "../screens/ClassScreens/LearningScreens/Class6x2/Class6x2x6";
import Class6x2x7 from "../screens/ClassScreens/LearningScreens/Class6x2/Class6x2x7";
import Class6x2x8 from "../screens/ClassScreens/LearningScreens/Class6x2/Class6x2x8";
import Class6x2x9 from "../screens/ClassScreens/LearningScreens/Class6x2/Class6x2x9";
import Class6x2x10 from "../screens/ClassScreens/LearningScreens/Class6x2/Class6x2x10";
import Class6x2x11 from "../screens/ClassScreens/LearningScreens/Class6x2/Class6x2x11";
import Class6x3x1 from "../screens/ClassScreens/LearningScreens/Class6x3/Class6x3x1";
import Class6x3x2 from "../screens/ClassScreens/LearningScreens/Class6x3/Class6x3x2";
import Class6x3x3 from "../screens/ClassScreens/LearningScreens/Class6x3/Class6x3x3";
import Class6x3x4 from "../screens/ClassScreens/LearningScreens/Class6x3/Class6x3x4";
import Class6x3x5 from "../screens/ClassScreens/LearningScreens/Class6x3/Class6x3x5";
import Class6x3x6 from "../screens/ClassScreens/LearningScreens/Class6x3/Class6x3x6";
import Class6x3x7 from "../screens/ClassScreens/LearningScreens/Class6x3/Class6x3x7";
import Class6x3x8 from "../screens/ClassScreens/LearningScreens/Class6x3/Class6x3x8";
import Class6x3x9 from "../screens/ClassScreens/LearningScreens/Class6x3/Class6x3x9";
import Class6x3x10 from "../screens/ClassScreens/LearningScreens/Class6x3/Class6x3x10";
import Class6x3x11 from "../screens/ClassScreens/LearningScreens/Class6x3/Class6x3x11";
import Class6x4x1 from "../screens/ClassScreens/LearningScreens/Class6x4/Class6x4x1";
import Class6x4x2 from "../screens/ClassScreens/LearningScreens/Class6x4/Class6x4x2";
import Class6x4x3 from "../screens/ClassScreens/LearningScreens/Class6x4/Class6x4x3";
import Class6x4x4 from "../screens/ClassScreens/LearningScreens/Class6x4/Class6x4x4";
import Class6x4x5 from "../screens/ClassScreens/LearningScreens/Class6x4/Class6x4x5";
import Class6x4x6 from "../screens/ClassScreens/LearningScreens/Class6x4/Class6x4x6";
import Class6x4x7 from "../screens/ClassScreens/LearningScreens/Class6x4/Class6x4x7";
import Class6x4x8 from "../screens/ClassScreens/LearningScreens/Class6x4/Class6x4x8";
import Class6x4x9 from "../screens/ClassScreens/LearningScreens/Class6x4/Class6x4x9";
import Class6x5x1 from "../screens/ClassScreens/LearningScreens/Class6x5/Class6x5x1";
import Class6x5x2 from "../screens/ClassScreens/LearningScreens/Class6x5/Class6x5x2";
import Class6x5x3 from "../screens/ClassScreens/LearningScreens/Class6x5/Class6x5x3";
import Class6x5x4 from "../screens/ClassScreens/LearningScreens/Class6x5/Class6x5x4";
import Class6x5x5 from "../screens/ClassScreens/LearningScreens/Class6x5/Class6x5x5";
import Class6x5x6 from "../screens/ClassScreens/LearningScreens/Class6x5/Class6x5x6";
import Class6x5x7 from "../screens/ClassScreens/LearningScreens/Class6x5/Class6x5x7";
import Class6x5x8 from "../screens/ClassScreens/LearningScreens/Class6x5/Class6x5x8";
import Class6x5x9 from "../screens/ClassScreens/LearningScreens/Class6x5/Class6x5x9";
import Class6x6x1 from "../screens/ClassScreens/LearningScreens/Class6x6/Class6x6x1";
import Class6x6x2 from "../screens/ClassScreens/LearningScreens/Class6x6/Class6x6x2";
import Class6x6x3 from "../screens/ClassScreens/LearningScreens/Class6x6/Class6x6x3";
import Class6x6x4 from "../screens/ClassScreens/LearningScreens/Class6x6/Class6x6x4";
import Class6x6x5 from "../screens/ClassScreens/LearningScreens/Class6x6/Class6x6x5";
import Class6x6x6 from "../screens/ClassScreens/LearningScreens/Class6x6/Class6x6x6";
import Class6x6x7 from "../screens/ClassScreens/LearningScreens/Class6x6/Class6x6x7";
import Exc1x1x1 from "../screens/ClassScreens/ExerciseScreens/Exc1/Exc1x1x1";
import Exc1x2x1 from "../screens/ClassScreens/ExerciseScreens/Exc1/Exc1x2x1";
import Exc1x3x1 from "../screens/ClassScreens/ExerciseScreens/Exc1/Exc1x3x1";
import Exc1x4x1 from "../screens/ClassScreens/ExerciseScreens/Exc1/Exc1x4x1";
import Exc1x5x1 from "../screens/ClassScreens/ExerciseScreens/Exc1/Exc1x5x1";
import Exc1x6x1 from "../screens/ClassScreens/ExerciseScreens/Exc1/Exc1x6x1";
import Exc2x1x1 from "../screens/ClassScreens/ExerciseScreens/Exc2/Exc2x1x1";
import Exc2x2x1 from "../screens/ClassScreens/ExerciseScreens/Exc2/Exc2x2x1";
import Exc2x3x1 from "../screens/ClassScreens/ExerciseScreens/Exc2/Exc2x3x1";
import Exc2x4x1 from "../screens/ClassScreens/ExerciseScreens/Exc2/Exc2x4x1";
import Exc2x5x1 from "../screens/ClassScreens/ExerciseScreens/Exc2/Exc2x5x1";
import Exc2x6x1 from "../screens/ClassScreens/ExerciseScreens/Exc2/Exc2x6x1";
import Exc3x1x1 from "../screens/ClassScreens/ExerciseScreens/Exc3/Exc3x1x1";
import Exc3x2x1 from "../screens/ClassScreens/ExerciseScreens/Exc3/Exc3x2x1";
import Exc3x3x1 from "../screens/ClassScreens/ExerciseScreens/Exc3/Exc3x3x1";
import Exc3x4x1 from "../screens/ClassScreens/ExerciseScreens/Exc3/Exc3x4x1";
import Exc3x5x1 from "../screens/ClassScreens/ExerciseScreens/Exc3/Exc3x5x1";
import Exc3x6x1 from "../screens/ClassScreens/ExerciseScreens/Exc3/Exc3x6x1";
import Exc4x1x1 from "../screens/ClassScreens/ExerciseScreens/Exc4/Exc4x1x1";
import Exc4x2x1 from "../screens/ClassScreens/ExerciseScreens/Exc4/Exc4x2x1";
import Exc4x3x1 from "../screens/ClassScreens/ExerciseScreens/Exc4/Exc4x3x1";
import Exc4x4x1 from "../screens/ClassScreens/ExerciseScreens/Exc4/Exc4x4x1";
import Exc4x5x1 from "../screens/ClassScreens/ExerciseScreens/Exc4/Exc4x5x1";
import Exc5x1x1 from "../screens/ClassScreens/ExerciseScreens/Exc5/Exc5x1x1";
import Exc5x2x1 from "../screens/ClassScreens/ExerciseScreens/Exc5/Exc5x2x1";
import Exc5x3x1 from "../screens/ClassScreens/ExerciseScreens/Exc5/Exc5x3x1";
import Exc5x4x1 from "../screens/ClassScreens/ExerciseScreens/Exc5/Exc5x4x1";
import Exc5x5x1 from "../screens/ClassScreens/ExerciseScreens/Exc5/Exc5x5x1";
import Exc5x6x1 from "../screens/ClassScreens/ExerciseScreens/Exc5/Exc5x6x1";
import Type1 from "../screens/ClassScreens/ExerciseScreens/Types/Type1";
import Type2 from "../screens/ClassScreens/ExerciseScreens/Types/Type2";
import Type3 from "../screens/ClassScreens/ExerciseScreens/Types/Type3";
import Type4 from "../screens/ClassScreens/ExerciseScreens/Types/Type4";
import Type5 from "../screens/ClassScreens/ExerciseScreens/Types/Type5";
import Type6 from "../screens/ClassScreens/ExerciseScreens/Types/Type6";
import Type7 from "../screens/ClassScreens/ExerciseScreens/Types/Type7";
import Type8 from "../screens/ClassScreens/ExerciseScreens/Types/Type8";
import Type9x2 from "../screens/ClassScreens/ExerciseScreens/Types/Type9x2";
import Type9x3 from "../screens/ClassScreens/ExerciseScreens/Types/Type9x3";
import Type9x4 from "../screens/ClassScreens/ExerciseScreens/Types/Type9x4";
import Type9x5 from "../screens/ClassScreens/ExerciseScreens/Types/Type9x5";
import Type9x6 from "../screens/ClassScreens/ExerciseScreens/Types/Type9x6";
import Type9x7 from "../screens/ClassScreens/ExerciseScreens/Types/Type9x7";
import Type9x8 from "../screens/ClassScreens/ExerciseScreens/Types/Type9x8";
import Type9x9 from "../screens/ClassScreens/ExerciseScreens/Types/Type9x9";
import Type9x10 from "../screens/ClassScreens/ExerciseScreens/Types/Type9x10";
import Exc1x3x1testing from "../screens/ClassScreens/ExerciseScreens/Exc1x3/Exc1x3x1";




const Stack = createStackNavigator(); 

const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={WelcomeScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Main" component={Tabs} options={{headerShown: false, animationEnabled: false}}/>
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="UpdatePassword" component={NewPasswordScreen} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Reauth" component={ReAuthScreen} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Forget" component={ForgetPassScreen} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="LearnWord" component={LearnWordScreen} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="TestWord" component={TestWordScreen} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="ExitExcScreen" component={ExitExcScreen} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Settings" component={SettingsScreen} options={{headerShown: false, animationEnabled: false}}/>
                <Stack.Screen name="Reading" component={ReadingScreen} options={{headerShown: false, animationEnabled: false}}/>
                <Stack.Screen name="Text" component={TextScreen} options={{headerShown: false, animationEnabled: false}}/>
                <Stack.Screen name="ChangePic" component={ChangePictureScreen} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="MyList" component={MyListScreen} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="EditList" component={EditListScreen} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="PublicLists" component={PublicListScreen} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="CreateList" component={CreateListScreen} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Terms" component={TermsScreen} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x1x1" component={Class1x1x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x1x2" component={Class1x1x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x2x1" component={Class1x2x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x2x2" component={Class1x2x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x2x3" component={Class1x2x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x2x4" component={Class1x2x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x2x5" component={Class1x2x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x2x6" component={Class1x2x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x2x7" component={Class1x2x7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x2x8" component={Class1x2x8} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x2x9" component={Class1x2x9} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x1x3" component={Class1x1x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x1x4" component={Class1x1x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x1x5" component={Class1x1x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x1x6" component={Class1x1x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x1x7" component={Class1x1x7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x1x8" component={Class1x1x8} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x1x9" component={Class1x1x9} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x1x10" component={Class1x1x10} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x3x1" component={Class1x3x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x3x2" component={Class1x3x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x3x3" component={Class1x3x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x3x4" component={Class1x3x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x3x5" component={Class1x3x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x3x6" component={Class1x3x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x3x7" component={Class1x3x7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x3x8" component={Class1x3x8} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x3x9" component={Class1x3x9} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x3x10" component={Class1x3x10} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x3x11" component={Class1x3x11} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x3x12" component={Class1x3x12} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x4x1" component={Class1x4x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x4x2" component={Class1x4x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x4x3" component={Class1x4x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x4x4" component={Class1x4x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x4x5" component={Class1x4x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x4x6" component={Class1x4x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x4x7" component={Class1x4x7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x4x8" component={Class1x4x8} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x4x9" component={Class1x4x9} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x4x10" component={Class1x4x10} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x4x11" component={Class1x4x11} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x4x12" component={Class1x4x12} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x4x13" component={Class1x4x13} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x5x1" component={Class1x5x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x5x2" component={Class1x5x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x5x3" component={Class1x5x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x5x4" component={Class1x5x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x5x5" component={Class1x5x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x5x6" component={Class1x5x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x5x7" component={Class1x5x7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x5x8" component={Class1x5x8} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class1x5x9" component={Class1x5x9} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x1x1" component={Class2x1x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x1x2" component={Class2x1x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x1x3" component={Class2x1x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x1x4" component={Class2x1x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x1x5" component={Class2x1x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x1x6" component={Class2x1x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x1x7" component={Class2x1x7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x1x8" component={Class2x1x8} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x1x9" component={Class2x1x9} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x1x10" component={Class2x1x10} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x1x11" component={Class2x1x11} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x2x1" component={Class2x2x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x2x2" component={Class2x2x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x2x3" component={Class2x2x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x2x4" component={Class2x2x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x2x5" component={Class2x2x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x2x6" component={Class2x2x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x2x7" component={Class2x2x7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x2x8" component={Class2x2x8} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x2x9" component={Class2x2x9} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x2x10" component={Class2x2x10} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x2x11" component={Class2x2x11} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x3x1" component={Class2x3x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x3x2" component={Class2x3x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x3x3" component={Class2x3x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x3x4" component={Class2x3x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x3x5" component={Class2x3x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x3x6" component={Class2x3x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x3x7" component={Class2x3x7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x3x8" component={Class2x3x8} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x3x9" component={Class2x3x9} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x3x10" component={Class2x3x10} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x3x11" component={Class2x3x11} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x3x12" component={Class2x3x12} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x4x1" component={Class2x4x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x4x2" component={Class2x4x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x4x3" component={Class2x4x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x4x4" component={Class2x4x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x4x5" component={Class2x4x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x4x6" component={Class2x4x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x4x7" component={Class2x4x7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x4x8" component={Class2x4x8} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x4x9" component={Class2x4x9} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x4x10" component={Class2x4x10} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x4x11" component={Class2x4x11} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x5x1" component={Class2x5x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x5x2" component={Class2x5x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x5x3" component={Class2x5x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x5x4" component={Class2x5x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x5x5" component={Class2x5x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x5x6" component={Class2x5x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x5x7" component={Class2x5x7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x5x8" component={Class2x5x8} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x6x1" component={Class2x6x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x6x2" component={Class2x6x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x6x3" component={Class2x6x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x6x4" component={Class2x6x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x6x5" component={Class2x6x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x6x6" component={Class2x6x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x6x7" component={Class2x6x7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x6x8" component={Class2x6x8} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x6x9" component={Class2x6x9} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x6x10" component={Class2x6x10} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x6x11" component={Class2x6x11} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x7x1" component={Class2x7x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x7x2" component={Class2x7x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x7x3" component={Class2x7x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x7x4" component={Class2x7x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x7x5" component={Class2x7x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x7x6" component={Class2x7x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x7x7" component={Class2x7x7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x7x8" component={Class2x7x8} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x7x9" component={Class2x7x9} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class2x7x10" component={Class2x7x10} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x1x1" component={Class3x1x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x1x2" component={Class3x1x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x1x3" component={Class3x1x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x1x4" component={Class3x1x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x1x5" component={Class3x1x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x1x6" component={Class3x1x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x1x7" component={Class3x1x7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x1x8" component={Class3x1x8} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x1x9" component={Class3x1x9} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x1x10" component={Class3x1x10} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x1x11" component={Class3x1x11} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x2x1" component={Class3x2x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x2x2" component={Class3x2x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x2x3" component={Class3x2x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x2x4" component={Class3x2x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x2x5" component={Class3x2x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x2x6" component={Class3x2x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x3x1" component={Class3x3x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x3x2" component={Class3x3x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x3x3" component={Class3x3x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x3x4" component={Class3x3x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x3x5" component={Class3x3x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x3x6" component={Class3x3x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x3x7" component={Class3x3x7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x3x8" component={Class3x3x8} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x3x9" component={Class3x3x9} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x3x10" component={Class3x3x10} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x4x1" component={Class3x4x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x4x2" component={Class3x4x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x4x3" component={Class3x4x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x4x4" component={Class3x4x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x4x5" component={Class3x4x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x4x6" component={Class3x4x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x4x7" component={Class3x4x7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x4x8" component={Class3x4x8} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x4x9" component={Class3x4x9} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x5x1" component={Class3x5x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x5x2" component={Class3x5x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x5x3" component={Class3x5x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x5x4" component={Class3x5x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x5x5" component={Class3x5x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x5x6" component={Class3x5x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x5x7" component={Class3x5x7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x5x8" component={Class3x5x8} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x5x9" component={Class3x5x9} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class3x5x10" component={Class3x5x10} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x1x1" component={Class4x1x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x1x2" component={Class4x1x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x1x3" component={Class4x1x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x1x4" component={Class4x1x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x1x5" component={Class4x1x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x1x6" component={Class4x1x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x1x7" component={Class4x1x7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x1x8" component={Class4x1x8} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x1x9" component={Class4x1x9} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x1x10" component={Class4x1x10} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x1x11" component={Class4x1x11} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x1x12" component={Class4x1x12} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x1x13" component={Class4x1x13} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x2x1" component={Class4x2x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x2x2" component={Class4x2x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x2x3" component={Class4x2x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x2x4" component={Class4x2x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x2x5" component={Class4x2x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x2x6" component={Class4x2x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x2x7" component={Class4x2x7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x2x8" component={Class4x2x8} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x3x1" component={Class4x3x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x3x2" component={Class4x3x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x3x3" component={Class4x3x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x3x4" component={Class4x3x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x3x5" component={Class4x3x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x3x6" component={Class4x3x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x3x7" component={Class4x3x7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x4x1" component={Class4x4x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x4x2" component={Class4x4x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x4x3" component={Class4x4x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x4x4" component={Class4x4x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x4x5" component={Class4x4x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x4x6" component={Class4x4x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x4x7" component={Class4x4x7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x4x8" component={Class4x4x8} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x4x9" component={Class4x4x9} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x4x10" component={Class4x4x10} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x5x1" component={Class4x5x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x5x2" component={Class4x5x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x5x3" component={Class4x5x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x5x4" component={Class4x5x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x5x5" component={Class4x5x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x5x6" component={Class4x5x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x5x7" component={Class4x5x7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x5x8" component={Class4x5x8} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x5x9" component={Class4x5x9} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x6x1" component={Class4x6x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x6x2" component={Class4x6x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x6x3" component={Class4x6x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x6x4" component={Class4x6x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x6x5" component={Class4x6x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x6x6" component={Class4x6x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x6x7" component={Class4x6x7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x6x8" component={Class4x6x8} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class4x6x9" component={Class4x6x9} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x1x1" component={Class5x1x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x1x2" component={Class5x1x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x1x3" component={Class5x1x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x1x4" component={Class5x1x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x1x5" component={Class5x1x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x1x6" component={Class5x1x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x1x7" component={Class5x1x7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x1x8" component={Class5x1x8} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x1x9" component={Class5x1x9} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x1x10" component={Class5x1x10} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x2x1" component={Class5x2x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x2x2" component={Class5x2x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x2x3" component={Class5x2x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x2x4" component={Class5x2x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x2x5" component={Class5x2x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x2x6" component={Class5x2x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x2x7" component={Class5x2x7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x2x8" component={Class5x2x8} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x2x9" component={Class5x2x9} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x2x10" component={Class5x2x10} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x2x11" component={Class5x2x11} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x2x12" component={Class5x2x12} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x2x13" component={Class5x2x13} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x3x1" component={Class5x3x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x3x2" component={Class5x3x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x3x3" component={Class5x3x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x3x4" component={Class5x3x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x3x5" component={Class5x3x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x3x6" component={Class5x3x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x3x7" component={Class5x3x7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x3x8" component={Class5x3x8} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x3x9" component={Class5x3x9} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x3x10" component={Class5x3x10} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x3x11" component={Class5x3x11} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x3x12" component={Class5x3x12} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x4x1" component={Class5x4x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x4x2" component={Class5x4x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x4x3" component={Class5x4x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x4x4" component={Class5x4x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x4x5" component={Class5x4x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x4x6" component={Class5x4x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x4x7" component={Class5x4x7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x4x8" component={Class5x4x8} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x5x1" component={Class5x5x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x5x2" component={Class5x5x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x5x3" component={Class5x5x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x5x4" component={Class5x5x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x5x5" component={Class5x5x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x5x6" component={Class5x5x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x5x7" component={Class5x5x7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x5x8" component={Class5x5x8} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x5x9" component={Class5x5x9} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x6x1" component={Class5x6x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x6x2" component={Class5x6x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x6x3" component={Class5x6x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x6x4" component={Class5x6x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x6x5" component={Class5x6x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x6x6" component={Class5x6x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x6x7" component={Class5x6x7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x6x8" component={Class5x6x8} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x6x9" component={Class5x6x9} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x7x1" component={Class5x7x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x7x2" component={Class5x7x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x7x3" component={Class5x7x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x7x4" component={Class5x7x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x7x5" component={Class5x7x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x7x6" component={Class5x7x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x7x7" component={Class5x7x7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x7x8" component={Class5x7x8} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x7x9" component={Class5x7x9} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x7x10" component={Class5x7x10} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class5x7x11" component={Class5x7x11} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x1x1" component={Class6x1x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x1x2" component={Class6x1x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x1x3" component={Class6x1x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x1x4" component={Class6x1x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x1x5" component={Class6x1x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x1x6" component={Class6x1x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x1x7" component={Class6x1x7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x1x8" component={Class6x1x8} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x2x1" component={Class6x2x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x2x2" component={Class6x2x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x2x3" component={Class6x2x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x2x4" component={Class6x2x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x2x5" component={Class6x2x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x2x6" component={Class6x2x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x2x7" component={Class6x2x7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x2x8" component={Class6x2x8} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x2x9" component={Class6x2x9} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x2x10" component={Class6x2x10} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x2x11" component={Class6x2x11} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x3x1" component={Class6x3x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x3x2" component={Class6x3x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x3x3" component={Class6x3x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x3x4" component={Class6x3x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x3x5" component={Class6x3x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x3x6" component={Class6x3x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x3x7" component={Class6x3x7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x3x8" component={Class6x3x8} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x3x9" component={Class6x3x9} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x3x10" component={Class6x3x10} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x3x11" component={Class6x3x11} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x4x1" component={Class6x4x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x4x2" component={Class6x4x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x4x3" component={Class6x4x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x4x4" component={Class6x4x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x4x5" component={Class6x4x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x4x6" component={Class6x4x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x4x7" component={Class6x4x7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x4x8" component={Class6x4x8} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x4x9" component={Class6x4x9} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x5x1" component={Class6x5x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x5x2" component={Class6x5x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x5x3" component={Class6x5x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x5x4" component={Class6x5x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x5x5" component={Class6x5x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x5x6" component={Class6x5x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x5x7" component={Class6x5x7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x5x8" component={Class6x5x8} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x5x9" component={Class6x5x9} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x6x1" component={Class6x6x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x6x2" component={Class6x6x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x6x3" component={Class6x6x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x6x4" component={Class6x6x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x6x5" component={Class6x6x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x6x6" component={Class6x6x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Class6x6x7" component={Class6x6x7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Exc1x1x1" component={Exc1x1x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Exc1x2x1" component={Exc1x2x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Exc1x3x1" component={Exc1x3x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Exc1x4x1" component={Exc1x4x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Exc1x5x1" component={Exc1x5x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Exc1x6x1" component={Exc1x6x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Exc2x1x1" component={Exc2x1x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Exc2x2x1" component={Exc2x2x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Exc2x3x1" component={Exc2x3x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Exc2x4x1" component={Exc2x4x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Exc2x5x1" component={Exc2x5x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Exc2x6x1" component={Exc2x6x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Exc3x1x1" component={Exc3x1x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Exc3x2x1" component={Exc3x2x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Exc3x3x1" component={Exc3x3x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Exc3x4x1" component={Exc3x4x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Exc3x5x1" component={Exc3x5x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Exc3x6x1" component={Exc3x6x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Exc4x1x1" component={Exc4x1x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Exc4x2x1" component={Exc4x2x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Exc4x3x1" component={Exc4x3x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Exc4x4x1" component={Exc4x4x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Exc4x5x1" component={Exc4x5x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Exc5x1x1" component={Exc5x1x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Exc5x2x1" component={Exc5x2x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Exc5x3x1" component={Exc5x3x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Exc5x4x1" component={Exc5x4x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Exc5x5x1" component={Exc5x5x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Exc5x6x1" component={Exc5x6x1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Type1" component={Type1} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Type2" component={Type2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Type3" component={Type3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Type4" component={Type4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Type5" component={Type5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Type6" component={Type6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Type7" component={Type7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Type8" component={Type8} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Type9x2" component={Type9x2} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Type9x3" component={Type9x3} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Type9x4" component={Type9x4} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Type9x5" component={Type9x5} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Type9x6" component={Type9x6} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Type9x7" component={Type9x7} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Type9x8" component={Type9x8} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Type9x9" component={Type9x9} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Type9x10" component={Type9x10} options={{headerShown: false, animationEnabled: false }}/>
                <Stack.Screen name="Testing" component={Exc1x3x1testing} options={{headerShown: false, animationEnabled: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default Router;
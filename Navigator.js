import {  createAppContainer ,createDrawerNavigator,createBottomTabNavigator,createMaterialTopTabNavigator} from 'react-navigation';
import Splash from './Splash.js';
import Slider from './Slider.js';
import Login from './Login.js';
import Otp from './Otp.js';
import Register from './Register.js';
import Forgot from './Forgot.js';
import BasicDetail from './BasicDetail.js';
import Nurse from './Nurse.js';
import NurseBooking from './NurseBooking.js';
import NurseTime from './NurseTime.js';
import MedicalService from './MedicalService.js';
import  MedicalServiceBooking from './MedicalServiceBooking.js';
import  SurgicalPackage from './SurgicalPackage.js';
import  OpdHealth from './OpdHealth.js';
import DoctorVisit   from './DoctorVisit.js';
import DoctorVisitDetail from './DoctorVisitDetail.js';
import Emergency from './Emergency.js';
import BookingAppointment from './BookingAppointment.js';
import BookingAppointmentDetail from './BookingAppointmentDetail.js';
import BookingDetailFinal from './BookingDetailFinal.js';
import Confirmation from './Confirmation.js';
import DoctorDetail from './DoctorDetail.js';
import HospitalList from './HospitalList.js';
import HospitalDetail from './HospitalDetail.js';
import AmbulanceBooking from './AmbulanceBooking.js';
import Speciality from './Speciality.js';
import Location from './Location.js';
import Home from './Home.js';
import HealthPackege from './HealthPackege.js';
import Instamozo from './Instamozo.js';
import Payment from './Payment.js';
import Thankyou from './Thankyou.js';
import Chat from './Chat.js';
import FullDetail from './FullDetail.js';
import Review from './Review.js';
import AddMember from './AddMember.js';
import ListMember from './ListMember.js';
import AddAddress from './AddAddress.js';
import ListAddress from './ListAddress.js';
import Allergies from './Allergies.js';
import Illness from './Illness.js';
import BasicSurgies from './BasicSurgies.js';
import Department from './Department.js';
import Filter from './Filter.js';
import  SpecialityFilter from  './SpecialityFilter.js';
import  HospitalFilter from  './HospitalFilter.js';
import  OnlineBooking from  './OnlineBooking.js';
import  OnlineVideo from  './OnlineVideo.js';
import  OfflineBooking from  './OfflineBooking.js';
import  Quation from  './OfflineBooking.js';
import  Landing from  './Landing.js';
import  BookingHistory from  './BookingHistory.js';
import  EditProfile from  './EditProfile.js';
import React, {Component} from 'react';


import { createStackNavigator } from 'react-navigation-stack'
const StackNavigator = createStackNavigator({

        Splash: { screen: Splash },
        Landing:{screen:Landing},
        Home:{screen:Home},
        BookingHistory:{screen:BookingHistory},
        SpecialityFilter:{screen:SpecialityFilter},
            Department:{screen:Department},
        BasicDetail: { screen: BasicDetail },
        Allergies: { screen: Allergies },
        Illness: { screen: Illness },
        BasicSurgies: { screen: BasicSurgies },
        ListAddress: { screen: ListAddress },
        AddAddress: { screen: AddAddress },
        EditProfile: { screen: EditProfile },
        Slider: { screen: Slider },
        Login: { screen: Login },
            Filter:{screen:Filter},
        OnlineBooking:{screen:OnlineBooking},

        AmbulanceBooking:{screen:AmbulanceBooking},
        HospitalList:{screen:HospitalList},
            BookingAppointment:{screen:BookingAppointment},
            DoctorVisit:{screen:DoctorVisit},
        OpdHealth:{screen:OpdHealth},
        SurgicalPackage:{screen:SurgicalPackage},
        MedicalService:{screen:MedicalService},
        Nurse: { screen: Nurse },
        OnlineVideo: { screen: OnlineVideo },

        Otp: { screen: Otp },
        Register: { screen: Register },
        Forgot: { screen: Forgot },
        OfflineBooking:{screen:OfflineBooking},
        NurseTime:{screen:NurseTime},
        Payment:{screen:Payment},
        Thankyou:{screen:Thankyou},
        Instamozo:{screen:Instamozo},
        NurseBooking:{screen:NurseBooking},
        MedicalServiceBooking:{screen:MedicalServiceBooking},
            DoctorVisitDetail:{screen:DoctorVisitDetail},
            Emergency:{screen:Emergency},
        BookingAppointmentDetail:{screen:BookingAppointmentDetail},
        BookingDetailFinal:{screen:BookingDetailFinal},
        Confirmation:{screen:Confirmation},
        DoctorDetail:{screen:DoctorDetail},
        HospitalDetail:{screen:HospitalDetail},
        Location:{screen:Location},
        HealthPackege:{screen:HealthPackege},
        Speciality:{screen:Speciality},
        Chat:{screen:Chat},
        FullDetail:{screen:FullDetail},
            Review:{screen:Review},
            AddMember:{screen:AddMember},
            ListMember:{screen:ListMember},
            HospitalFilter:{screen:HospitalFilter},
        Quation:{screen:Quation},
    },

   // {headerMode :'none'},
);

export default createAppContainer(StackNavigator);
//LabourLaw
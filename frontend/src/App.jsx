import React from 'react';
import Loading from './components/Loading';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import HomeAdmin from './pages/HomeAdmin';
import Welcome from './pages/Welcome';
import Welcome1 from './pages/Quiz/Welcome1';
import Login from './pages/login';
import Register from './pages/Register';
import Profile from './pages/User/Profile';
import ProfileReport from './pages/User/ProfileReport';

import User from './pages/User/Users';
import DetailUser from './pages/User/DetailUser';
import EditUser from './pages/User/EditUser';
import ReportFood from './pages/User/ReportFoodDetail';

import AddRecipe from './pages/Recipe/AddRecipe';

import FoodList from './pages/Food/FoodList';
import FoodDetailbyId from './pages/Food/FoodDetailbyId';
import EditFood from './pages/Food/EditFood';
import AddFood from './pages/Food/AddFood';

import AddProgram from './pages/Program/AddProgram';
import Program from './pages/Program/Program';
import EditProgram from './pages/Program/EditProgram';
import ProgramDetail from './pages/Program/ProgramDetail';

import AddExercise from './pages/Exercise/AddExercise';
import Exercise from './pages/Exercise/Exercises';
import ExerciseDetail from './pages/Exercise/ExerciseDetail';
import EditExercise from './pages/Exercise/EditExercise';

import Category from './pages/Category/Category'
import AddCategory from './pages/Category/AddCategory'
import CategoryDetail from './pages/Category/CategoryDetail'
import EditCategory from './pages/Category/EditCategory'

import AddCourse from './pages/Course/AddCourse';
import ListCourse from './pages/Course/ListCourse';
import CourseDetailbyId from './pages/Course/CourseDetailbyID';
import EditCourse from './pages/Course/EditCourse';

import Home from './pages/Home';
const Food = React.lazy(() => import('./pages/Food/Food'));
const FoodDetail = React.lazy(() => import('./pages/Food/FoodDetail'));
import Recipe from './pages/Recipe/Recipe';
import RecipeDetail from './pages/Recipe/RecipeDetail';
import Course from './pages/Course/Course';
import CourseDetail from './pages/Course/CourseDetail';
import MyCourse from './pages/Course/MyCourse';
const ListProgram = React.lazy(() => import('./pages/Course/ListProgram'));
const StartProgram = React.lazy(() => import('./pages/Course/StartProgram'));
const Quiz1 = React.lazy(() => import('./pages/Quiz/Quiz1'));
const Quiz2 = React.lazy(() => import('./pages/Quiz/Quiz2'));
const Quiz3 = React.lazy(() => import('./pages/Quiz/Quiz3'));
const Quiz4 = React.lazy(() => import('./pages/Quiz/Quiz4'));
const Quiz5 = React.lazy(() => import('./pages/Quiz/Quiz5'));
const Quiz6 = React.lazy(() => import('./pages/Quiz/Quiz6'));
const Quiz7 = React.lazy(() => import('./pages/Quiz/Quiz7'));
import './App.css'
import RecipeList from './pages/Recipe/RecipeList';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/welcome' element={<Welcome />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/introduction' element={<PrivateRoute><Welcome1 /></PrivateRoute>} />
          <Route path='/quiz' element={<React.Suspense fallback={<Loading />}><PrivateRoute><Quiz1 /></PrivateRoute></React.Suspense>} />
          <Route path='/quiz2' element={<React.Suspense fallback={<Loading />}><PrivateRoute><Quiz2 /></PrivateRoute></React.Suspense>} />
          <Route path='/quiz3' element={<React.Suspense fallback={<Loading />}><PrivateRoute><Quiz3 /></PrivateRoute></React.Suspense>} />
          <Route path='/quiz4' element={<React.Suspense fallback={<Loading />}><PrivateRoute><Quiz4 /></PrivateRoute></React.Suspense>} />
          <Route path='/quiz5' element={<React.Suspense fallback={<Loading />}><PrivateRoute><Quiz5 /></PrivateRoute></React.Suspense>} />
          <Route path='/quiz6' element={<React.Suspense fallback={<Loading />}><PrivateRoute><Quiz6 /></PrivateRoute></React.Suspense>} />
          <Route path='/quiz7' element={<React.Suspense fallback={<Loading />}><PrivateRoute><Quiz7 /></PrivateRoute></React.Suspense>} />

          <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path='/profile/report-food' element={<PrivateRoute><ProfileReport /></PrivateRoute>} />
          <Route path='/food' element={<React.Suspense fallback={<Loading />}><PrivateRoute><Food /></PrivateRoute></React.Suspense>} />
          <Route path='/food/:id' element={<React.Suspense fallback={<Loading />}><PrivateRoute><FoodDetail /></PrivateRoute></React.Suspense>} />
          <Route path='/recipe' element={<PrivateRoute><Recipe /></PrivateRoute>} />
          <Route path='/recipe/:id' element={<PrivateRoute><RecipeDetail /></PrivateRoute>} />

          <Route path='/admin/recipe/add' element={<PrivateRoute><AddRecipe /></PrivateRoute>} />
          <Route path='/admin/recipe' element={<PrivateRoute><RecipeList /></PrivateRoute>} />

          <Route path='/course' element={<PrivateRoute><Course /></PrivateRoute>} />
          <Route path='/course/me' element={<PrivateRoute><MyCourse /></PrivateRoute>} />
          <Route path='/course/:id' element={<PrivateRoute><CourseDetail /></PrivateRoute>} />
          <Route path='/course/list' element={<React.Suspense fallback={<Loading />}><PrivateRoute><ListProgram /></PrivateRoute></React.Suspense>} />
          <Route path='/course/list/start' element={<React.Suspense fallback={<Loading />}><PrivateRoute><StartProgram /></PrivateRoute></React.Suspense>} />


          <Route path='/admin' element={<HomeAdmin />} />

          <Route path='/admin/food' element={<FoodList />} />
          <Route path='/admin/food/add' element={<AddFood />} />
          <Route path='/admin/food/edit/:id' element={<EditFood />} />
          <Route path='/admin/food/:id' element={<FoodDetailbyId />} />

          <Route path='/user' element={<User />} />
          <Route path='/user/:id' element={<DetailUser />} />
          <Route path='/user/edit/:id' element={<EditUser />} />
          <Route path='/user/report-food' element={<ReportFood />} />

          <Route path='/category' element={<Category />} />
          <Route path='/category/:id' element={<CategoryDetail />} />
          <Route path='/category/edit/:id' element={<EditCategory />} />
          <Route path='/category/add' element={<AddCategory />} />

          <Route path='/exercise' element={<Exercise />} />
          <Route path='/exercise/:id' element={<ExerciseDetail />} />
          <Route path='/exercise/edit/:id' element={<EditExercise />} />
          <Route path='/exercise/add' element={<AddExercise />} />

          <Route path='/admin/course' element={<ListCourse />} />
          <Route path='/admin/course/add' element={<AddCourse />} />
          <Route path='/admin/course/edit/:id' element={<EditCourse />} />
          <Route path='/admin/course/:id' element={<CourseDetailbyId />} />

          <Route path='/program' element={<Program />} />
          <Route path='/program/add' element={<AddProgram />} />
          <Route path='/program/:id' element={<ProgramDetail />} />
          <Route path='/program/edit/:id' element={<EditProgram />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

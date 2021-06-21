<template>
  <section>
      <Menu/>
      <router-view></router-view>
  </section>
</template>

<script>
import Menu from './components/Menu.vue'

export default {
  name: 'App',
  components: {
    Menu,
  }
}
</script>

<style>
.mb-25 {
  margin-bottom: 25px;
}
.mb-65 {
  margin-bottom: 65px;
}

.btn-general {
  border: none;
  border-radius: 2px;
  padding: 1px 6px;
  display: inline-block;
  color: white !important;
  text-decoration: none !important;
}
.btn-general.blue {
  background-color: rgb(14, 14, 255);
}
.btn-general.green {
  background-color: rgb(26, 163, 79);
}
.btn-general.danger {
  background-color: #dc3545;
}

.btn-space .btn-general {
  margin-left: 5px;
}
.title-path {
  font-size: 35px;
}
.bg-blue {
  background-color: rgb(1, 1, 87);
}
.place-info {
  font-size: 15px;
  margin-bottom: 5px;
}
.place-border-schedules {
  border: 1px solid black;
  padding: 5px;
  margin-bottom: 35px;
}
.place-border {
  border: 1px solid black;
  padding: 5px;
  margin-bottom: 35px;
}
.scheduling-date-time {
  margin-top: 20px;
  background-color:  rgb(1, 1, 87);
  color: white;
}
.scheduling-date-time p {
  font-size: 17px;
}
.place-buttons {
  margin-top: 20px;
}
.place-buttons button {
  margin: 5px;
}
.place-border-schedules img {
  height: 100%;
  width: 100%;
}
@media (max-width: 991px)
{
  .place-border-schedules img {
    height: 250px;
    width: 100%;
  }
}
.place-border img {
  height: 100%;
  width: 100%;
}
@media (max-width: 767px)
{
  .place-border img {
    height: 250px;
    width: 100%;
  }
}
@media (min-width: 768px)
{
  .place-infos {
    padding-left: 0;
    padding-right: 25px;
    text-align: center;
    margin-top: 10px;
  }
  .place-infos.search {
    margin-top: 15px;
  }
}
@media (max-width: 768px)
{
  .place-infos {
    margin-top: 10px;
  }
}
.modal-backdrop {
  opacity: 0.6;
}
.modal-body {
  padding: 15px 0 !important;
}
.modal-border {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}
.add-hours .start {
  margin-bottom: 24px;
}
@media (min-width: 992px)
{
  /* .add-hours .finish{
    float: right;
  } */
}
@media (max-width: 991px)
{
  .add-hours {
    text-align: center;
  }
}
.vdatetime-input {
  font-size: 20px;
  text-align: center;
}

.navbar-brand {
  color: white;
}
.nav-link {
  color: white;
}
.alert-general {
    width: 250px; 
    height: 90px; 
    position: fixed; 
    bottom: 20px; 
    right: 10px;
    border-radius: 5px; 
    border: 1px solid;
    font-weight: 900;
    z-index: 1;
}
.alert-general.danger {
    background-color: #ff9c9c; 
    color: red; 
    border-color: red; 
}
.alert-general.success {
    background-color: #c1ffc1;
    color: green;
    border-color: green; 
}
.border-alert {
    border-bottom: 1px solid;
}
.border-alert.danger {
    border-color: red;
}
.border-alert.success {
    border-color: green;
}
.alert-general div {
    padding: 5px;
}
.form-error {
    color: red;
    font-size: 13px;
}
</style>

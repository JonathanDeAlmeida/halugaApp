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
.mt-65 {
  margin-top: 65px;
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
    border: 1px solid #86868654;
    padding: 5px;
    margin-bottom: 35px;
    border-radius: 5px;
    /* box-shadow: 5px 5px 5px 5px rgb(0 0 0 / 8%); */
    box-shadow: 3px 3px 3px 3px#cccccc54;
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
.input-line {
    border: none;
    border-bottom: 1px solid #9e9e9e;
    border-radius: 0;
    outline: none;
    width: 100%;
    font-size: 16px;
    display: inline;
}
.label-line {
    font-size: 13px;
    color: #555555;
}
.select-line {
    cursor: pointer;
    border: none;
    border-bottom: 1px solid #9e9e9e;
    outline: none;
    height: 35px;
    width: 100%;
    font-size: 16px;
}
.width-place-space {
  width: 11%;
}
.width-place-button {
  width: 45%;
}
@media (max-width: 991px)
{
  .width-place-space {
    width: 20%;
  }
  .width-place-button {
    width: 100%;
  }
}
.place-details {
  text-align: left;
}
@media (max-width: 991px)
{
  .place-details {
    text-align: center;
  }
}

.place-rent-value {
  font-size: 30px;
  font-weight: bold; 
}
.place-secondary-value {
  font-size: 16px;
}
.place-description {
  font-size: 16px;
  margin-top: 15px;
}
.place-address {
  font-size: 16px;
}
.place-number {
  display: block;
  padding-top: 10px;
  font-size: 15px;
}
.place-space {
  display: block;
  font-size: 13px;
}
.fs-15 {
  font-size: 15px;
}
.carousel-item {
    height: 255px;
}
.place-rent-value-detail {
  font-size: 30px;
  font-weight: bold; 
}
.width-place-space-detail {
  width: 14%;
}
@media (max-width: 767px)
{
  .width-place-space-detail {
    width: 19%;
  }
}
.responsible-place {
  border: 1px solid black;
  margin-top: 50px;
  padding: 10px;
}
.responsible-name {
  display: block;
  font-size: 18px;
  padding: 10px;
}
.responsible-phone {
  display: block;
  font-size: 18px;
  padding: 10px;
}
.place-description-search {
  font-size: 16px;
  margin-top: 15px;
  display: inline-block;
}
.place-images-desktop {
  display: block;
}
.place-images-mobile {
  display: none;
}
@media (max-width: 800px)
{
  .place-images-desktop {
    display: none;
  }
  .place-images-mobile {
    display: block;
  }
}
.place-image-item-desktop {
  width: 25%; 
  height: 320px;
  padding: 0 1px;
}
.place-image-item-mobile {
  width :50%;
  height: 320px;
  padding: 0 1px;
}

.btn-all-photos-desktop {
  display: block;
}
.btn-all-photos-mobile {
  display: none;
}
@media (max-width: 767px)
{
  .btn-all-photos-desktop {
    display: none;
  }
  .btn-all-photos-mobile {
    display: block;
  }
}
.btn-place-actions {
  float: right;
}
@media (max-width: 991px)
{
  .btn-place-actions {
    float: none !important;
    margin-bottom: 15px;
  }
}
</style>

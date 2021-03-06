import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as $ from 'jquery'
import { ItemsService } from '../items.service';

declare var $: any;

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrls: ['./all-items.component.scss']
})

export class AllItemsComponent implements OnInit { 

  restaurant;
  categories = [];
  categoryName;
  allItems;
  imagesLink = this.service.imagesLink;

  constructor(private service:ItemsService, private _router: Router) {
  }

  getCategoryItems(id){
    this.allItems = this.categories[id].items;
    this.categoryName = this.categories[id].arName;
    this.service.hideLoading();
  }

  sendItemData(itemData){
    this._router.navigate(['/one-item',{id:JSON.stringify(itemData.id)}] );
    localStorage.setItem("oneItem", JSON.stringify(itemData));
  }


  ngOnInit(): void {
    this.service.getData().subscribe(data=>{
      this.restaurant =  data; 
      this.categories = this.restaurant.data.categories;
      this.allItems = this.categories[0].items;
      this.categoryName = this.categories[0].arName;
      this.runOwl();
      this.service.hideLoading();
    });
    
  }

  showMenu(){
    this.service.showMenu();
  }

  
  hideLoading(){
    $(".loading").fadeOut();
  }

  runOwl(){
    setTimeout( function(){
      $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        dots:false,
        navText: ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
        responsive:{
            0:{
                items:3
            },
            600:{
                items:3
            },
            1000:{
                items:4
            }
        }
      }) 
    }, 0)
  }
  ngAfterContentInit(){
  }
  
  ngAfterViewInit() {
    $("#main-loading").fadeOut();
  }

  ngAfterViewChecked(){
  }
   
}
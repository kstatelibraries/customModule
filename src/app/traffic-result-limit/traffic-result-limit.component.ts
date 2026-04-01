   import { Component, OnInit } from '@angular/core';                                                                                                     
   import { Location, NgIf } from '@angular/common';                                                                                                            
                                                                                                                                                          
   @Component({                                                                                                                                           
     selector: 'custom-traffic-result-limit',                                                                                                             
     standalone: true,                                                                                                                                    
     imports: [NgIf],                                                                                                                                         
     templateUrl: './traffic-result-limit.component.html',                                                                                                
     styleUrl: './traffic-result-limit.component.scss',                                                                                                   
   })                                                                                                                                                     
   export class TrafficResultLimitComponent implements OnInit {                                                                                           
     showComponent: boolean = false;                                                                                                                      
     offsetValue: number | null = null;                                                                                                                   
                                                                                                                                                          
     constructor(private location: Location) {}                                                                                                           
                                                                                                                                                          
     ngOnInit(): void {                                                                                                                                   
       this.checkOffset();                                                                                                                                
     }                                                                                                                                                    
                                                                                                                                                          
     checkOffset(): void {                                                                                                                                
       const url = this.location.path();                                                                                                                  
       const queryString = url.includes('?') ? url.split('?')[1] : '';                                                                                    
                                                                                                                                                          
       if (!queryString) {                                                                                                                                
         this.showComponent = false;                                                                                                                      
         return;                                                                                                                                          
       }                                                                                                                                                  
                                                                                                                                                          
       const urlParams = new URLSearchParams(queryString);                                                                                                
       const offsetParam = urlParams.get('offset');                                                                                                       
                                                                                                                                                          
       if (offsetParam) {                                                                                                                                 
         const offsetValue = parseInt(offsetParam, 10);                                                                                                   
         if (!isNaN(offsetValue) && offsetValue > 500) {                                                                                                  
           this.showComponent = true;                                                                                                                     
         } else {                                                                        
           this.showComponent = false;                                                                                                                    
         }                                                                                                                                                
       } else { 
        this.showComponent = false;                                                                                                                      
       }                                                                                                                                                  
     }                                                                                                                                                    
   } 
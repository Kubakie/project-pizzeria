/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  'use strict';
  const select = {
    templateOf: {
      menuProduct: '#template-menu-product',
    },
  
    containerOf: {
      menu: '#product-list',
      cart: '#cart',
    },
    all: {
      menuProducts: '#product-list > .product',
      menuProductsActive: '#product-list > .product.active',
      formInputs: 'input, select',
    },
    menuProduct: {
      clickable: '.product__header',
      form: '.product__order',
      priceElem: '.product__total-price .price',
      imageWrapper: '.product__images',
      amountWidget: '.widget-amount',
      cartButton: '[href="#add-to-cart"]',
    },
    widgets: {
      amount: {
        input: 'input[name="amount"]',
        linkDecrease: 'a[href="#less"]',
        linkIncrease: 'a[href="#more"]',
      },
    },
  };
  const classNames = {
    menuProduct: {
      wrapperActive: 'active',
      imageVisible: 'active',
    },
  };
  const settings = {
    amountWidget: {
      defaultValue: 1,
      defaultMin: 1,
      defaultMax: 9,
    }
  };
  const templates = {
    menuProduct: Handlebars.compile(document.querySelector(select.templateOf.menuProduct).innerHTML),

  };
  class Product {
    constructor(id, data) {
      const thisProduct = this;
      thisProduct.id = id;
      thisProduct.data = data;
      thisProduct.renderInMenu();
      thisProduct.getElements();
      thisProduct.initAccordion();
    
     
        
      console.log('new Product:', thisProduct);
    }
    renderInMenu(){
      const thisProduct = this;
      /* generate HTML based on template */
      const generatedHTML = templates.menuProduct(thisProduct.data);    
      /* create element using utils.createElementFromHTML */
      thisProduct.element = utils.createDOMFromHTML(generatedHTML);    
      /* find menu container */
      const menuContainer = document.querySelector(select.containerOf.menu);    
      /* add element to menu */
      menuContainer.appendChild(thisProduct.element);    
    }
    getElements(){
      const thisProduct = this;

      thisProduct.accordionTrigger = thisProduct.element.querySelector(select.menuProduct.clickable);
      thisProduct.form = thisProduct.element.querySelector(select.menuProduct.form);
      thisProduct.formInputs = thisProduct.form.querySelectorAll(select.all.formInputs);
      thisProduct.cartButton = thisProduct.element.querySelector(select.menuProduct.cartButton);
      thisProduct.priceElem = thisProduct.element.querySelector(select.menuProduct.priceElem);
    }  
    initAccordion(){
      const  thisProduct = this;
        
      /* find the clickable trigger (the element that should react to clicking) */
      let trigger = thisProduct.accordionTrigger;

      /* [IN PROGRESS]START: click event listener to trigger */
      trigger.addEventListener('click',function(){
           
        /* prevent default action for event */
        event.preventDefault();
        /* toggle active class on element of thisProduct */
        thisProduct.element.classList.toggle('active');
        /* find all active products */
        const activeproducts = document.querySelectorAll(select.all.menuProductsActive);
        /* START LOOP: for each active product */
        for( let activeproduct of activeproducts) {
          console.log('ThisProduct:',thisProduct);
          console.log('activeproduct:',activeproduct);
          /* START: if the active product isn't the element of thisProduct */
          if(activeproduct !== thisProduct.element) {
            activeproduct.classList.remove('active');
          }    
        }
        

        /* remove class active for the active product */

        /* END: if the active product isn't the element of thisProduct */

        /* END LOOP: for each active product */

        /* END: click event listener to trigger */
      });

      
    }  
  }
  const app = {
    initMenu: function(){
      const ThisApp = this;
      console.log('thisApp.data:', ThisApp.data);    
      for(let productData in ThisApp.data.products){
        new Product(productData, ThisApp.data.products[productData]);     
      }
    },
    initData: function(){
      const thisApp = this;
      thisApp.data = dataSource;
            
    },  
    init: function () {
      const thisApp = this;
      console.log('*** App starting ***');
      console.log('thisApp:', thisApp);
      console.log('classNames:', classNames);
      console.log('settings:', settings);
      console.log('templates:', templates);
      thisApp.initData();
     
      thisApp.initMenu();
    },  
   
  };
   
  app.init();
}

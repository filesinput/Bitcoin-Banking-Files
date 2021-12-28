jQuery(document).ready(function($) {
	'use strict';	
	
	var htmlBody = $('html, body');
	
	
	// Scroll to top link
	$('a[href="#top"]').on('click', function () {
		htmlBody.animate({
			scrollTop: 0
		}, 800);
		return false;
	});	

	
	// Hamburger menu toggle
	var sideMenuToggle = $('#site-navigation-side, #wrapper, #side-menu-bg');
	var overlayMenuToggle = $('#site-navigation-overlay, #wrapper');
	
	$('.menu-toggle-wrapper.side-menu').on('click', function () {
		sideMenuToggle.toggleClass('side-menu-active');
	});		
	
	$('.menu-toggle-wrapper.overlay-menu').on('click', function () {
		overlayMenuToggle.toggleClass('overlay-menu-active');
	});		
	
	$('#wrapper').mouseup(function(e) {
        var subject = $("#site-navigation-side"); 
        if(e.target.id != subject.attr('id') && !subject.has(e.target).length) {
            sideMenuToggle.removeClass('side-menu-active');
        }
    });
	

	// Mobile menu
	var mobileMenuToggle = $('#mobile-site-navigation, #wrapper, #mobile-menu-bg');
	
	$('.toggle-mobile-menu').on('click', function () {
		mobileMenuToggle.toggleClass('mobile-menu-active');
	});		
	
	$('#mobile-menu-bg').on('click', function () {
		mobileMenuToggle.removeClass('mobile-menu-active');
	});
	
	$('#mobile-site-navigation ul li.menu-item-has-children span, #mobile-site-navigation ul li.menu-item-has-children a').on('click', function () {
		$(this).parent().toggleClass('submenu-open');
	});	
	
	
	// One page menu scroll
	$('.one-page-link a[href^="#"]').on('click', function() {
		var headerHeight = $('#site-header.header-style-default').innerHeight();
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
			|| location.hostname == this.hostname) {

			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			   if (target.length) {
				 $(htmlBody).animate({
					 scrollTop: target.offset().top-headerHeight
				}, 1000);
				return false;
			}
		}
	});

	
	// Header search toggle
	$('.toggle-header-search').on('click', function () {
		$(htmlBody).toggleClass('header-search-active');
	});
	
	
	// Set top bar drop-down heigth
	var topBar = $('#top-bar-wrapper').innerHeight() + 'px';
	$('#top-bar .widget_nav_menu ul.menu > li > a').css('line-height', topBar);
	
	
	
	$(window).scroll(function() {
		// Mobile sticky header
		var mobile_header = $('#mobile-site-header');
		
		if ($(this).scrollTop() > 0) {
				mobile_header.css({ 'position' : 'fixed', 'top' : '0px', 'z-index' : '100' });
			} else {
				mobile_header.css({ 'position' : 'relative', 'width' : '100%' });
		}
		
		// Scroll to top button
		var scroll_top_bttn = $('.scrollToTop');
		
		if ( $(this).scrollTop() > 150 ) {
			$(scroll_top_bttn).addClass('scrollactive');
		} else {
			$(scroll_top_bttn).removeClass('scrollactive');
		}
	});	
	
	
	$(window).load(function() {
		
		// Visual Composer RTL fix
		if( $('html').attr('dir') == 'rtl' ){
        $('[data-vc-full-width="true"]').each( function(i,v){
            $(this).css('right' , $(this).css('left') ).css( 'left' , 'auto');
        });
		}
	
	
		// Mega menu (with tabs)
		$('.megamenu-tabs').each(function(){
			$( '.menu-item', this ).wrapAll( '<ul class="tabs-nav" />');
			$( '.tab-content', this ).wrapAll( '<ul class="tabs-content-wrapper" />');
			$( '.tabs-nav, .tabs-content-wrapper', this ).wrapAll( '<li class="submenu-content" />');
			$('ul.sub-menu', this).show();
			
			$('.tab-content:not(:first-child)', this).addClass('tab-hidden');
			$('.tabs-nav li:first-child', this).addClass('nav-active');
			$('.tabs-nav li', this).hover(function() {
				var tabId = $(this).attr('id');
				$(this).closest('.tabs-nav').find('li').removeClass('nav-active');
				$(this).addClass('nav-active');
				$(this).closest('.submenu-content').find('li.tab-content').addClass('tab-hidden');
				$(this).closest('.submenu-content').find('li.'+tabId).removeClass('tab-hidden');
			}); 
			
		});

		
		// Fix slider width issue
		$('.flexslider').trigger('resize');
		$('.mnky-posts-slider .flexslider .slides').fadeTo( 500, 1 );
		$('.mnky-posts-slider .mp-ajax-loader').fadeTo( 300, 0 ).hide();
		
	});  
	
	// Add class to read more link containing paragraph
	$('.mp-layout-5 .mp-full-content .more-link, .archive-style-2 .entry-content .more-link').parentsUntil('.post-content-wrapper, .mp-content-container').addClass('has-more');
	
	
	// Remove animation when viewing on mobile devices
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		$('.wpb_animate_when_almost_visible').removeClass('wpb_animate_when_almost_visible');
	}
	
	
	// Object-fit fallback 
	function object_fit_fallback() {
		if('objectFit' in document.documentElement.style === false) {
			var container = document.querySelectorAll('.mp-bg-img, .mpg-bg-img, .post-content-bg');
			for(var i = 0; i < container.length; i++) {
				if(container[i].getElementsByTagName('img').length > 0){
					var imageSource = container[i].querySelector('img').src;
					container[i].style.backgroundImage = 'url(' + imageSource + ')';
				}
			}
			$('.archive-style-2 .post-preview img,.mp-layout-5 .mp-image-url img,.mnky-posts-grid .mpg-image-url img').css('display', 'none');
		}
	}
	object_fit_fallback();
	
	$(document).ajaxComplete(function() {
		object_fit_fallback();
	});
	
});
// Wait for the document to load before running the script 
(function ($) {
  // We use some Javascript and the URL #fragment to hide/show different parts of the page
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Linking_to_an_element_on_the_same_page
  $(window).on('load hashchange', function(){
    
    // First hide all content regions, then show the content-region specified in the URL hash 
    // (or if no hash URL is found, default to first menu item)
    $('.content-region').addClass('hide');
    $('.content-region').removeClass('show');
    
    // Remove any active classes on the main-menu
    $('.main-menu a').removeClass('active');
    var region = location.hash.toString() || $('.main-menu a:first').attr('href');
    
    // Now show the region specified in the URL hash
    $(region).addClass('show');
    $(region).removeClass('hide');
    
    // Highlight the menu link associated with this region by adding the .active CSS class
    $('.main-menu a[href="'+ region +'"]').addClass('active'); 

    // Scroll to top of page
    setTimeout(function () {
      window.scrollTo(0, 0);
    }, 1);

    // For sections with "dynamic" class: Use AJAX to load the contents of an external file into the div based on URL fragment
    // This will extract the region name from URL hash, and then load [region].html into the section div
    var region = location.hash.toString() || '#first';
    if ($(region).hasClass('dynamic') && !$(region).hasClass('loaded')) {
      $(region).load(region.slice(1) + '.html');
      $(region).addClass('loaded');
    }
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    // If JS is enabled, then allow for dynamic resume preview without also downloading the resume by changing the hrefs to '#'
    document.querySelectorAll(".resume-link").forEach(elem => elem.setAttribute("href", "#"));
  });

  $('#hifi_fake').one('load', function() {
    $('#lofi_wrap').css('opacity', '0');
  }).each(function() {
    if (this.complete) {
      $(this).trigger('load');
    }
  });
  
})(jQuery);

// Function to change background size "cover" to
// either "100vw auto" (100 percent of viewport
// width and automatic height)
// or "auto 100vh" (automatic width and 100
// percent of viewport height).
// Adapted from StackOverflow post written by Perttu https://stackoverflow.com/a/48705670
// Access Date: May 13, 2020
fixBackgroundSizeCover = function (event) {
  var bgImageWidth = 5142,
    bgImageHeight = 3428,
    bgImageRatio = bgImageWidth / bgImageHeight,
    windowSizeRatio = window.innerWidth / window.innerHeight;

  var bgWraps = document.getElementsByClassName('background_wrap');
  if (bgImageRatio > windowSizeRatio) {
    bgWraps[0].style.backgroundSize = 'auto 100vh';
    bgWraps[1].style.backgroundSize = 'auto 100vh';
  } else {
    bgWraps[0].style.backgroundSize = '100vw auto';
    bgWraps[1].style.backgroundSize = '100vw auto';
  }
};

// Execute the fix function once upon load
fixBackgroundSizeCover();

// Execute the fix function everytime on window resize
window.addEventListener('resize', fixBackgroundSizeCover);

const isMobile = () => 'ontouchstart' in document.documentElement;

showLightbox = function() {
  document.querySelector(".lightbox").classList.add("show");
};

hideLightbox = function() {
  document.querySelector(".lightbox").classList.remove("show");
};

let resumeElementLoaded = false;

showResumePdf = function(clickSource) {
  if (isMobile()) {
    document.location.href = "/resume.pdf";
  } else {
    showLightbox();
    if (!resumeElementLoaded) {
      const innerHTML = $(".lightbox").html();
      // Dynamically load resume preview element so that resume pdf only loads when it's actually opened
      // and to also fix an error message that comes up on Firefox after opening print preview due to Firefox's built-in pdf.js still loading pdf
      $(".lightbox").load("resume.html", () => {
        $(".lightbox").append(innerHTML);
        resumeElementLoaded = true;
      });
    }
  }
  gtag('event', 'Opened Resume', {
    event_label: clickSource,
  });
};

window.addEventListener('keydown', (e) => {
  if (e.key === "Escape") {
    hideLightbox();
  }
});

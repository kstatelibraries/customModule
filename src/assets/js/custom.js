/* <!-- Google Tag Manager -->  */
var GTM_CODE = 'GTM-PPW6CDM';

// Initialize dataLayer before GTM
window.dataLayer = window.dataLayer || [];

// GTM initialization
(function (w, d, s, l, i) {
  w[l] = w[l] || [];w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != 'dataLayer' ? '&l=' + l : '';
  j.async = true;
  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', GTM_CODE);

// Enhanced click tracking for Angular
document.addEventListener('click', function(event) {
  var element = event.target;
  var clickData = {
    event: 'angularClick',
    element: {
      tagName: element.tagName,
      id: element.id,
      className: element.className,
      text: element.textContent?.trim().substring(0, 100) || '',
      href: element.href || '',
      attributes: {}
    }
  };
  
  // Extract data attributes
  Array.from(element.attributes).forEach(function(attr) {
    if (attr.name.startsWith('data-')) {
      clickData.element.attributes[attr.name] = attr.value;
    }
  });
  
  window.dataLayer.push(clickData);
}, true); // Use capture phase for Angular compatibility

/* <!-- End Google Tag Manager --> */
(function () {
  // Scroll animations
  var animItems = document.querySelectorAll('.animate-on-scroll');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });
    animItems.forEach(function (el) { observer.observe(el); });
  } else {
    animItems.forEach(function (el) { el.classList.add('in-view'); });
  }

  // Wiggle animation on final CTA
  var finalBtn = document.getElementById('final-cta-btn');
  if (finalBtn && 'IntersectionObserver' in window) {
    var wiggleObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          finalBtn.style.animation = 'wiggle 0.6s ease';
          finalBtn.addEventListener('animationend', function () {
            finalBtn.style.animation = '';
          }, { once: true });
          wiggleObserver.unobserve(finalBtn);
        }
      });
    }, { threshold: 0.5 });
    wiggleObserver.observe(finalBtn);
  }

  // FAQ accordion
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    item.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      faqItems.forEach(function (other) {
        other.classList.remove('open');
        var icon = other.querySelector('.faq-toggle-icon');
        if (icon) icon.textContent = '+';
      });
      if (!isOpen) {
        item.classList.add('open');
        var icon = item.querySelector('.faq-toggle-icon');
        if (icon) icon.textContent = '\u2212';
      }
    });
  });

  // Pass URL params to affiliate links
  var params = window.location.search;
  if (params) {
    document.querySelectorAll('.btn[href*="placeholder-affiliate-link"]').forEach(function (link) {
      link.href = link.href.split('?')[0] + params;
    });
  }
})();

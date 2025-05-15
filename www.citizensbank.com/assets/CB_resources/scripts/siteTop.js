const observer = new MutationObserver(function(mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      
		const cookieJs = document.querySelector('script[src="//cdn.cookielaw.org/scripttemplates/otSDKStub.js"]');
          
        if (cookieJs && !cookieJs.hasAttribute('data-domain-script')) {
          
          const rgx =/^(www)\./;
          	cookieJs.setAttribute("data-domain-script",
                rgx.test(window.location.hostname)? "c09b5c2d-bdc7-47cc-869f-10ba0899fdaf" : "c09b5c2d-bdc7-47cc-869f-10ba0899fdaf-test");
            const wrapperFunc = document.createElement('script');
			wrapperFunc.innerHTML ='function OptanonWrapper(){}';
			wrapperFunc.type ='text/javascript';
			document.head.appendChild(wrapperFunc);
			observer.disconnect();
        }
    }
  }
});
 

observer.observe(document.head, { childList: true});
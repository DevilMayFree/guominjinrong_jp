var canonicalpath = location.pathname;
canonicalpath = canonicalpath.replace(".page", ".aspx");
var ref = document.getElementsByTagName('title')[0];
var link = !!document.querySelector("link[rel='canonical']") ? document.querySelector("link[rel='canonical']") : document.createElement('link');
link.setAttribute('rel', 'canonical');
link.setAttribute('href', location.protocol + '//' + location.host + canonicalpath);
ref.parentNode.insertBefore(link, ref);
var app = {
	initialize: function() {
		this.bindEvents();
	},
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	onDeviceReady: function() {
		app.receivedEvent('deviceready');
	},
	receivedEvent: function(id) {
		console.log('Received Event: ' + id);
		app.bbuistart();
	},
	checkInstance: function() {
		if (webworksreadyFired) return;
		webworksreadyFired = true;
	},
	themeSetup: function() {
		var config;
		darkScreenColor = 'black';
		if (darkColoring) {
			config = {
				controlsDark: true,
				listsDark: true
			};
		} else {
			config = {
				controlsDark: false,
				listsDark: false,
				coloredTitleBar: true
			};
		}
		return config;
	},
	bbuistart: function() {
		this.checkInstance();
		var config = this.themeSetup();

		config.onscreenready = function(element, id) {
			console.log('载入页面: ' + id);
			if (darkColoring) {
				var screen = element.querySelector('[data-bb-type=screen]');
				if (screen) {
					screen.style['background-color'] = darkScreenColor;
				}
			}
			if (id === 'settings') {
				loadSettings(element, id);
			} else {
				app.addMenu(element);
			}

		};
		config.ondomready = function(element, id, params) {
			if (id === 'menu') {
				app.readList(element);
			}
		};
		bb.init(config);
		if (darkColoring) {
			document.body.style['background-color'] = darkScreenColor;
			document.body.style['color'] = '#E6E6E6';
		}
		bb.pushScreen('menu.html', 'menu');
		//navigator.splashscreen.hide();
	},
	readList: function(dom) {
		var c = dom.getElementById('list');
		var items = [],
			item;
		// Create the item's DOM in a fragment
		for (var i = 0; i < article.list.length; i++) {
			item = document.createElement('div');
			item.setAttribute('data-bb-type', 'item');
			item.setAttribute('data-bb-title', article.list[i].title);
			item.setAttribute('url', article.list[i].url);
			item.innerHTML = article.list[i].by;
			item.onclick = function() {
				app.gotoList();
			};
			items.push(item);
		}
		c.refresh(items);
	},
	gotoList: function() {
		var item = document.getElementById('list').selected;
		console.log(item);
		var u = item.getAttribute('url');
		console.log(u);
		bb.pushScreen(u, 'view');
	},
	addMenu: function(dom) {

		var screenmenu = document.createElement('div');
		screenmenu.setAttribute('data-bb-type', 'menu');

		var about = document.createElement('div');
		about.setAttribute('data-bb-type', 'menu-item');
		about.setAttribute('data-bb-img', 'img/ic_info.png');
		about.innerHTML = "About";
		about.onclick = function() {
			Toast.regular("about", 3000);
		}
		screenmenu.appendChild(about);

		var rate = document.createElement('div');
		rate.setAttribute('data-bb-type', 'menu-item');
		rate.setAttribute('data-bb-img', 'img/ic_browser.png');
		rate.innerHTML = "Rate";
		rate.onclick = function() {
			Toast.regular("rate", 3000);
		}
		screenmenu.appendChild(rate);

		var sett = document.createElement('div');
		sett.setAttribute('data-bb-type', 'menu-item');
		sett.setAttribute('data-bb-img', 'img/ic_settings.png');
		sett.innerHTML = "Settings";
		sett.onclick = function() {
			bb.pushScreen('settings.html', 'settings');
		}
		screenmenu.appendChild(sett);

		gg(dom, 'screen').appendChild(screenmenu);
	}
};
/*
 * Merrick's Functions.
 */
function g(id) {
	return gg(document, id);
}

function gg(el, id) {
	return el.getElementById(id);
}

function qq(e, id) {
	return e.querySelector("[" + id + "]");
}

function q(id) {
	return qq(document, id);
}
/*
 * Settings
 */

function loadSettings(element, id) {
	var togglebutton = element.getElementById('themeToggle');
	var theme = localStorage.getItem("theme");
	if ('true' === theme) {
		usingDarkTheme = true;
		togglebutton.setAttribute('data-bb-checked', 'true');
	} else {
		usingDarkTheme = false;
		togglebutton.setAttribute('data-bb-checked', 'false');
	}
	bb.refresh();
}

function saveSettings(e) {
	if (e.checked) {
		console.log(">>使用黑色主题.");
		localStorage.setItem("theme", "true");
	} else {
		console.log(">>使用亮色主题.");
		localStorage.setItem("theme", "false");
	}
}

function refreshTheme() {
	var theme = localStorage.getItem("theme");
	if (theme === usingDarkTheme) {
		return;
	} else {
		window.location.reload();
	}
}
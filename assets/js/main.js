const data = [
    {
        "logo": "./assets/images/logo-devlens.svg",
        "name": "DevLens",
        "description": "Quickly inspect page layouts and visualize element boundaries.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-style-spy.svg",
        "name": "StyleSpy",
        "description": "Instantly analyze and copy CSS from any webpage element.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-speed-boost.svg",
        "name": "SpeedBoost",
        "description": "Optimizes browser resource usage to accelerate page loading.",
        "isActive": false
    },
    {
        "logo": "./assets/images/logo-json-wizard.svg",
        "name": "JSONWizard",
        "description": "Formats, validates, and prettifies JSON responses in-browser.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-tab-master-pro.svg",
        "name": "TabMaster Pro",
        "description": "Organizes browser tabs into groups and sessions.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-viewport-buddy.svg",
        "name": "ViewportBuddy",
        "description": "Simulates various screen resolutions directly within the browser.",
        "isActive": false
    },
    {
        "logo": "./assets/images/logo-markup-notes.svg",
        "name": "Markup Notes",
        "description": "Enables annotation and notes directly onto webpages for collaborative debugging.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-grid-guides.svg",
        "name": "GridGuides",
        "description": "Overlay customizable grids and alignment guides on any webpage.",
        "isActive": false
    },
    {
        "logo": "./assets/images/logo-palette-picker.svg",
        "name": "Palette Picker",
        "description": "Instantly extracts color palettes from any webpage.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-link-checker.svg",
        "name": "LinkChecker",
        "description": "Scans and highlights broken links on any page.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-dom-snapshot.svg",
        "name": "DOM Snapshot",
        "description": "Capture and export DOM structures quickly.",
        "isActive": false
    },
    {
        "logo": "./assets/images/logo-console-plus.svg",
        "name": "ConsolePlus",
        "description": "Enhanced developer console with advanced filtering and logging.",
        "isActive": true
    }
];

document.querySelector('label[for="all"]').onclick = () => { fill(data)};
document.querySelector('label[for="active"]').onclick = () => { fill(data.filter((val) => { return val.isActive == true;}))};
document.querySelector('label[for="inactive"]').onclick = () => { fill(data.filter((val) => { return val.isActive == false;}))};

function fill(data) {
	const extensions_container = document.getElementById("extensions");
	extensions_container.innerHTML = '';
	
	for( let ext of data ) {
		
		const ele = document.createElement('li');
		
		const img = document.createElement('img');
		img.src = ext.logo;
		img.height = 40;
	
		const title = document.createElement('strong');
		title.innerHTML = ext.name;
		
		const desc = document.createElement('p');
		desc.innerHTML = ext.description;
		
		const inputs = document.createElement('div');
		inputs.className = 'inputs';
		
		const remove = document.createElement('button');
		remove.innerHTML = 'Remove';
		remove.className = 'bg-white shadow-light radius-circle';
		
		const toggle = document.createElement('input');
		toggle.type = 'checkbox';
		toggle.checked = ext.isActive;
	
		inputs.appendChild(remove);
		inputs.appendChild(toggle);
		
		ele.appendChild(img);
		ele.appendChild(title);
		ele.appendChild(desc);
		ele.appendChild(inputs);
		
		extensions_container.appendChild(ele);
	}
}

/* Dark | Light Theme */
document.getElementById('toggle-dark-mode').onclick = (e) => {
	document.body.className = document.body.className == 'light' ? 'dark':'light';
	
	e.currentTarget.querySelector('img').src = document.body.className == 'light' ? './assets/images/icon-moon.svg':'./assets/images/icon-sun.svg';
	document.getElementById('main-logo').src = document.body.className == 'light' ? './assets/images/logo.svg':'./assets/images/logo-dark.svg';
};

document.body.onload = function() {
	fill(data);
};
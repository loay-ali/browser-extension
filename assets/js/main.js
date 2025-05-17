let store = [];

let data = [
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

const searchEle = document.getElementById('search');

document.querySelector('label[for="all"]').onclick = () => {
	fill(data.filter(val => {
		return ( searchEle.value == '' ? true:(val.name.search(searchEle.value) != -1) );
	}));
};

document.querySelector('label[for="active"]').onclick = () => {
	fill(data.filter((val) => { return val.isActive == true && (searchEle.value == '' ? true:(val.name.search(searchEle.value) != -1));}));
};

document.querySelector('label[for="inactive"]').onclick = () => {
	fill(data.filter((val) => { return val.isActive == false && (searchEle.value == '' ? true:(val.name.search(searchEle.value) != -1));}));
};

document.querySelector('label[for="store"]').onclick = () => {
	fill(store,true);
};

function fill(data,is_store = false) {
	const extensions_container = document.getElementById("extensions");
	extensions_container.innerHTML = '';
	
	if( data.length == 0 ) {
		extensions_container.innerHTML = '<i style = "color:#444;">No Results</i>';
		return;
	}
	
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
		
		if( is_store == false ) {
			const remove = document.createElement('button');
			remove.innerHTML = 'Remove';
			remove.className = 'bg-white shadow-light radius-circle';
			remove.setAttribute('data-func','remove');
			remove.onclick = (e) => del(e);
			
			const toggle = document.createElement('input');
			toggle.className = 'toggle-activation';
			toggle.id = ext.name;
			toggle.type = 'checkbox';
			toggle.onclick = toggle_activation;
			toggle.checked = ext.isActive;
	
			inputs.appendChild(remove);
			inputs.appendChild(toggle);
		}else {
			
			const download = document.createElement('button');
			download.innerHTML = 'Download';
			download.setAttribute('data-func','download');
			download.className = 'bg-white shadow-light radius-circle';
			download.onclick = (e) => del(e);
			
			inputs.appendChild(download);
		}
		
		ele.appendChild(img);
		ele.appendChild(title);
		ele.appendChild(desc);
		ele.appendChild(inputs);
		
		extensions_container.appendChild(ele);
	}
}

/* Search */
searchEle.addEventListener('keyup',(e) => {
	const group = document.querySelector('#filter-type input[type="radio"]:checked').value;
	const search = e.currentTarget.value;
	
	if( search == '' ) {
		fill(data.filter(val => {
			return (group == 'all' ? [false,true]:(group == 'active' ? [true]:[false])).indexOf(val.isActive) != -1;
		}));
		return;
	}
	
	fill(data.filter(val => {
		return (group == 'all' ? [false,true]:(group == 'active' ? [true]:[false])).indexOf(val.isActive) != -1 && val.name.search(search) != -1;
	}));
});

/* Toggle Activation Per Extension */
function toggle_activation(e) {
	let ind = -1;
	data.map((ele,i) => {
		if( ele.name == e.currentTarget.id )
			ind = i;
	});
	
	if( ind != -1 )
		data[ind].isActive = e.currentTarget.checked;

	const search = searchEle.value;
	const group = document.querySelector('#filter-type input[type="radio"]:checked').value;

	e.currentTarget.parentElement.parentElement.className = 'is-loading';

	setTimeout(() => {
		e.target.parentElement.parentElement.className = '';
		fill(data.filter(val => (group == 'all' ? [false,true]:(group == 'active' ? [true]:[false])).indexOf(val.isActive) != -1 && val.name.search(search) != -1));
	},1000);
}

/* Remove ( or Download ) */
function del(e) {
	const ele = e.currentTarget.parentElement.parentElement;
	ele.className = 'is-loading';
	
	setTimeout(() => {
		ele.className = '';
		ele.remove();
		
		if( e.target.dataset.func == 'remove' ) {
			const db_ele = data.filter(val => val.name == ele.querySelector('strong').innerHTML)[0];
			data = data.filter(val => val.name != ele.querySelector('strong').innerHTML);
			store.push(db_ele);
		}else if( e.target.dataset.func == 'download' ) {
			const db_ele = store.filter(val => val.name == ele.querySelector('strong').innerHTML)[0];
			store = store.filter(val => val.name != ele.querySelector('strong').innerHTML);
			data.push(db_ele);		
		}
	},1000);
}

/* Sortation */
document.getElementById('sort').onchange = (e) => {
	if( e.currentTarget.value == 'a-z' ) {
		data.sort((a,b) => a.name > b.name);
	}else {
		data.sort((b,a) => a.name > b.name);	
	}
	
	const search = searchEle.value;
	const group = document.querySelector('#filter-type input[type="radio"]:checked').value;
	
	fill(data.filter(val => (group == 'all' ? [false,true]:(group == 'active' ? [true]:[false])).indexOf(val.isActive) != -1 && val.name.search(search) != -1));
};

/* Toggle Search Section */
function toggle_search(e) {
	if( e.currentTarget.id == 'open-search' ) {
		document.getElementById('open-search').style.display = 'none';
		document.getElementById('search-section').style.display = 'flex';
	}else if( e.currentTarget.id == 'close-search' ) {
		document.getElementById('open-search').style.display = 'flex';
		document.getElementById('search-section').style.display = 'none';
		searchEle.value = '';
	}
}

for( ele of document.getElementsByClassName('toggle-search') ) {
	ele.onclick = toggle_search;
}

/* Dark | Light Theme */
document.getElementById('toggle-dark-mode').onclick = (e) => {
	document.body.className = document.body.className == 'light' ? 'dark':'light';
	
	document.getElementById('main-logo').src = document.body.className == 'light' ? './assets/images/logo.svg':'./assets/images/logo-dark.svg';
};

document.body.onload = function() {
	fill(data);
};
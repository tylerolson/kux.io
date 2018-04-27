var servers = [{
		"name": "Main",
		"ip": "https://" + window.location.hostname + "/",
	},
	{
		"name": "Test",
		"ip": "http://127.0.0.1:27015/"
	}
];

var serverSelect = document.getElementById("serverSelect");
for (i = 0; i < servers.length; i++) {
	var option = document.createElement('option');
	option.text = option.value = servers[i].name;
	serverSelect.add(option);
}
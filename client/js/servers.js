var servers = [{
		"name": "Main",
		"ip": window.location.hostname,
		"port": ""
	},
	{
		"name": "Test",
		"ip": "127.0.0.1",
		"port": "27015"
	}
];

var serverSelect = document.getElementById("serverSelect");
for (i = 0; i < servers.length; i++) {
	var option = document.createElement('option');
	option.text = option.value = servers[i].name;
	serverSelect.add(option);
}
var servers = [{
		"name": "PI",
		"ip": "76.14.55.144",
		"port": "25567"
	},
	{
		"name": "PC",
		"ip": "76.14.55.144",
		"port": "27015"
	},
	{
		"name": "local",
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
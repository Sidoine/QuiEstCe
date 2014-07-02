using System;
using Microsoft.AspNet.SignalR;
using System.Collections.Generic;

namespace WebApplication2
{
    /// <summary>
    /// Summary description for GameHub
    /// </summary>
    public class GameHub : Hub
    {
        private static Dictionary<string, string> names = new Dictionary<string, string>();

	    public void Echo(string message)
        {
            Clients.All.addMessage(Context.ConnectionId, message);
        }

        public void SetName(string name)
        {
            Clients.All.setName(Context.ConnectionId, name);
            names[Context.ConnectionId] = name;
        }

        public void GetPlayerList()
        {
            foreach (var name in names)
            {
                Clients.All.setName(name.Key, name.Value);
            }
        }
    }
}
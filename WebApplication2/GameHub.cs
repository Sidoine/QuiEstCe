using System;
using Microsoft.AspNet.SignalR;

namespace WebApplication2
{
    /// <summary>
    /// Summary description for GameHub
    /// </summary>
    public class GameHub : Hub
    {
	    public void Echo(string message)
        {
            Clients.All.addMessage(message);
        }
    }
}
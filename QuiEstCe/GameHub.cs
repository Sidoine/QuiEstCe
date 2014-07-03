using System;
using Microsoft.AspNet.SignalR;
using System.Collections.Generic;
using System.Threading.Tasks;
using QuiEstCe.Model;

namespace WebApplication2
{
    /// <summary>
    /// Summary description for GameHub
    /// </summary>
    public class GameHub : Hub
    {
        public void AddMessage(string message)
        {
            Clients.All.addMessage(Context.ConnectionId, message);
            if (message.ToLower() == Game.Instance.CurrentQuestion.Name.ToLower())
            {
                Game.Instance.AnswerQuestion(Context.ConnectionId);
                Clients.All.win(Context.ConnectionId, Game.Instance.Players[Context.ConnectionId].Points);
            }
        }

        public void SetName(string name)
        {
            Clients.All.setName(Context.ConnectionId, name);

            Game.Instance.SetPlayerName(Context.ConnectionId, name);
        }

        public override Task OnDisconnected()
        {
            Game.Instance.RemovePlayer(Context.ConnectionId);
            Clients.All.logout(Context.ConnectionId);
            return base.OnDisconnected();
        }
    }
}
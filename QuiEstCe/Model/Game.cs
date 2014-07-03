using System;
using System.Collections.Generic;

namespace QuiEstCe.Model
{
    /// <summary>
    /// Summary description for Game
    /// </summary>
    public class Game
    {
        private static Game _instance = new Game();
        public Dictionary<string, Player> Players { get; set; }

	    public Game()
	    {
            Players = new Dictionary<string, Player>();
        }

        public void SetPlayerName(string id, string name)
        {
            if (Players.ContainsKey(id))
                Players[id].Name = name;
            else
                Players.Add(id, new Player { Id = id, Name = name, Points = 0 });
        }

        public void RemovePlayer(string id)
        {
            Players.Remove(id);
        }

        public static Game Instance
        {
            get
            {
                return _instance;
            }
        }
    }
}
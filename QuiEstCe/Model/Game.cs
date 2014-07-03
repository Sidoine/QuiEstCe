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
        private List<Question> Questions { get; set; }
        public Question CurrentQuestion { get; set; }
        private Random random = new Random();

	    public Game()
	    {
            Players = new Dictionary<string, Player>();
            Questions = new List<Question>();
            Questions.Add(new Question { Image = "Images/arcis.jpg", Name = "Jean-Stéphane" });
            Questions.Add(new Question { Image = "Images/bentolila.jpg", Name = "Joël" });
            Questions.Add(new Question { Image = "Images/pachulski.jpg", Name = "Alexandre" });
            CurrentQuestion = Questions[random.Next(Questions.Count)];
        }

        public void AnswerQuestion (string playerId)
        {
            Players[playerId].Points++;

            CurrentQuestion = Questions[random.Next(Questions.Count)];
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
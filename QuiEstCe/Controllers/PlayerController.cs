﻿using Microsoft.AspNet.Mvc;
using QuiEstCe.Model;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace QuiEstCe.Controllers
{
    public class PlayerController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            return Json(Game.Instance.Players.Values);
        }
    }
}

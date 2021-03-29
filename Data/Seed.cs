using EusaHotDeskBooking.Modal;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace EusaHotDeskBooking.Data
{
    public class Seed
    {

        public static void Uploadseed(DataContext context)
        {

        
            if (!context.DeskLocations.Any())
            {
                var DeskData = System.IO.File.ReadAllText("Data/SeedData.json");
                List<DeskLocation> Desks = JsonConvert.DeserializeObject<List<DeskLocation>>(DeskData);
                context.DeskLocations.AddRange(Desks);
                context.SaveChanges();

            }
        }

    }
}

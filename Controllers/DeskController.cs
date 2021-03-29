using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Security.Cryptography;
using System.Threading.Tasks;
using EusaHotDeskBooking.Data;
using EusaHotDeskBooking.Modal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.ObjectPool;
using Newtonsoft;

namespace EusaHotDeskBooking.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DeskController : ControllerBase
    {

        private readonly IDeskRepository deskRepository;
   

        private readonly ILogger<DeskController> _logger;

        public DeskController(IDeskRepository _deskRepository)
        {
            deskRepository = _deskRepository;
          

        }



        [HttpGet]
        public IEnumerable<DeskLocation> Get()
        {

            var list = deskRepository.GetDesklocations().ToList();


            list.ForEach(l => {

                l.Isbooked = deskRepository.GetDesk().Any(c => c.Bookedfrom.Value.Date.Date == DateTime.Now.Date && c.location.Name == l.Name);

            });
            return list;
        }


        [HttpGet]
        [Route("GetMyMeetings")]
        public IEnumerable<Desk> GetMyMeetings(string username)
        {
            var userdata = deskRepository.GetDesk().ToList();
            return userdata.Where(desk => desk.Bookby.DisplayName == username && desk.Bookedfrom.Value.Date.Date >= DateTime.Now.Date.AddDays(-1)).OrderByDescending(date => date.Bookedfrom)

                .Select(c => new Desk { Bookby = c.Bookby, Bookedfrom = c.Bookedfrom.Value, Bookedto = c.Bookedto.Value, Id = c.Id, Isarchived = c.Isarchived, location = c.location, locationId = c.locationId });
             
        }




        [HttpGet]
        [Route("GetAllMeetingsAdmin")]
        public IEnumerable<Desk> GetAllMeetingsAdmin()
        {
            var userdata = deskRepository.GetDesk().ToList();
            return userdata.Where(desk =>  desk.Bookedfrom.Value.Date.Date >= DateTime.Now.Date.AddDays(-1)).OrderByDescending(date => date.Bookedfrom)

                .Select(c => new Desk { Bookby = c.Bookby, Bookedfrom = c.Bookedfrom.Value, Bookedto = c.Bookedto.Value, Id = c.Id, Isarchived = c.Isarchived, location = c.location, locationId = c.locationId });

        }

        [HttpGet]
        [Route("GetAllMeetings")]
        public IEnumerable<Desk> GetAllMeetings(string username)
        {
            var userdata = deskRepository.GetDesk().ToList();
            return userdata.Where(desk => desk.Bookby.DisplayName == username && desk.Bookedfrom.Value.Date.Date >= DateTime.Now.Date.AddDays(-14)).OrderByDescending(date => date.Bookedfrom)

                .Select(c => new Desk { Bookby = c.Bookby, Bookedfrom = c.Bookedfrom.Value, Bookedto = c.Bookedto.Value, Id = c.Id, Isarchived = c.Isarchived, location = c.location, locationId = c.locationId });

        }


        [HttpPost]
        [Route("Remove")]
        public async Task<IActionResult> Remove([FromBody] Desk value)
        {
            deskRepository.removethis(value);
            var response = await deskRepository.Save();
            return Ok(response);
        }



        [HttpPost]
        public  async Task<IActionResult> Post([FromBody] Desk value)
        {
            deskRepository.Add(value);
            var response = await deskRepository.Save();
            return Ok(response);
        }

        public class AddCustomerArgs
        {
            public DateTime date { get; set; }
            public string desk { get; set; }
        }

        [HttpGet]
        [Route("Agreement")]
        public bool Agreement(string username)
        {

           return deskRepository.Signedagreement(username);

        }
        [HttpPost]
        [Route("PostAgreement")]
        public async Task<IActionResult> PostAgreement([FromBody] Agreement Agreement)
        {

            deskRepository.Add(Agreement);
            var response = await deskRepository.Save();
            return Ok(response);

        }

        [HttpGet]
        [Route("LikeProfile")]
        public  List<DeskDates> GetLikeProfile()
        {

            var desklocation = deskRepository.GetDesklocations().ToList();

            return (from d in deskRepository.GetDesk()
                         group d by new { d.Bookedfrom, Name = desklocation.Where(c => c.Id == d.locationId).SingleOrDefault().Name }
              into grp
                         select new DeskDates
                         {
                             Dates = grp.Key.Bookedfrom.Value,
                             Name = grp.Key.Name,
                         }).ToList();

            
        }


    }
}

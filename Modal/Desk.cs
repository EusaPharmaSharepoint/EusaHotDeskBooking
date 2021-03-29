using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EusaHotDeskBooking.Modal
{
    public class Desk
    {

        public int Id { get; set; }


        [ForeignKey("location")]
        public int? locationId { get; set; }
        public virtual DeskLocation location { get; set; }

        public virtual User Bookby { get; set; }
        public DateTime? Bookedto { get; set; }
        public DateTime? Bookedfrom { get; set; }
        public bool Isarchived { get; set; }


    }



    public class DeskDates
    {
         public string Name { get; set; }

        public DateTime? Dates { get; set; }
    }
}
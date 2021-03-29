using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EusaHotDeskBooking.Modal
{
    public class Agreement
    {
        public int Id { get; set; }
        public DateTime AcceptedDate { get; set; }       
        public string UserName { get; set; }
    }
}

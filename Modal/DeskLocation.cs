
using System.Collections;
using System.Collections.Generic;

namespace EusaHotDeskBooking.Modal
{

    public class DeskLocation
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public bool ECCDesk { get; set; }

        public bool CustomerService { get; set; }

        public virtual ICollection<Desk> desks { get; set; }

        public bool Isbooked { get; set; }

        public string Floor { get; set; }

        public string RealDeskName { get; set; }

    }


}
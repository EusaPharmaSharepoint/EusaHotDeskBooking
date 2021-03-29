using EusaHotDeskBooking.Modal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EusaHotDeskBooking.Data
{
    public interface IDeskRepository
    {
        void Add<T>(T entity) where T: class;

        void Delete<T>(T entity) where T : class;

        Task<bool> Save() ;

        IEnumerable<Desk> GetDesk();
        void removethis(Desk desk);

        IEnumerable<DeskLocation> GetDesklocations();


        IEnumerable<Desk> GetDeskByUser(string username);

        bool Signedagreement(string username);
      

    }
}

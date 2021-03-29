using EusaHotDeskBooking.Modal;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EusaHotDeskBooking.Data
{
    public interface IRemove
    {
        void Add<T>(T entity) where T : class;

        void Delete<T>(T entity) where T : class;

        Task<bool> Save();

        IEnumerable<Desk> GetDesk();

        IEnumerable<DeskLocation> GetDesklocations();


        IEnumerable<Desk> GetDeskByUser(string username);

    }
}

using EusaHotDeskBooking.Modal;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EusaHotDeskBooking.Data
{
    public class DeskRepository : IDeskRepository
    {

        private readonly DataContext _context;


        public DeskRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }
        public void Delete<T>(T entity) where T : class
        {

            _context.Remove(entity);

        }
        public void removethis(Desk desk)
        {
            var _desk = _context.Desks.AsNoTracking().Where(d => d.Id == desk.Id).SingleOrDefault();
            _context.Remove(_desk);

        }


        public IEnumerable<Desk> GetDesk()
        {
            return _context.Desks.AsEnumerable();
        }
       
        public Desk GetDesk(string deskname)
        {
          
            return _context.Desks.Where(d => d.location.Name == deskname).SingleOrDefault();
        }

        public IEnumerable<Desk> GetDeskByUser(string name)
        {
         

            return _context.Desks.Where(c => c.Bookby.DisplayName == name).AsEnumerable();
        }

        public IEnumerable<T> GetDeskByUser<T>(string name) where T : class
        {
            throw new NotImplementedException();
        }

        public IEnumerable<DeskLocation> GetDesklocations()
        {
       
            return _context.DeskLocations.ToList();
        }

        public bool Signedagreement(string username)
        {
            return _context.Agreements.Any(c => c.UserName == username);
        }
       

        public async Task<bool> Save()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}

using EmloyeePayRoll_MVC_Ajax_Jquery.Models;
using Microsoft.EntityFrameworkCore;

namespace EmloyeePayRoll_MVC_Ajax_Jquery.Context
{
    public class EmployeePayRollContex : DbContext
    {
        public EmployeePayRollContex(DbContextOptions dbContextOptions) : base(dbContextOptions) { }
        
        public DbSet<Employee> Employees { get; set; }
    }
}

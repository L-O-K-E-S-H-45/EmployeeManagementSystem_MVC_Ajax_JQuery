using EmloyeePayRoll_MVC_Ajax_Jquery.Context;
using EmloyeePayRoll_MVC_Ajax_Jquery.Models;
using Microsoft.AspNetCore.Mvc;

namespace EmloyeePayRoll_MVC_Ajax_Jquery.Controllers
{
    public class EmployeeController : Controller
    {
        private readonly EmployeePayRollContex contex;
        public EmployeeController(EmployeePayRollContex contex)
        {
            this.contex = contex;
        }
        public IActionResult Index()
        {
            return View();
        }

        //[HttpGet]
        public JsonResult GeAllEmployees()
        {
            List<Employee> employees = contex.Employees.ToList();
            //foreach (var item in employees)
            //{
            //    Console.WriteLine(item.Salary);
            //}
            return new JsonResult(employees);
        }

        [HttpPost]
        public JsonResult AddEmployee(Employee employee)
        {
            //Employee employee1 = new Employee()
            //{
            //    EmployeeName = employee.EmployeeName,
            //    Email = employee.Email,
            //    ProfileImage = employee.ProfileImage,
            //    Gender = employee.Gender,
            //    Department = employee.Department,
            //    Salary = employee.Salary,
            //    HireDate = employee.HireDate
            //};

            contex.Employees.Add(employee);
            contex.SaveChanges();
            return Json(contex.Employees);
        }

        public JsonResult Delete(int employeeId)
        {
            Employee employee = contex.Employees.Where(e => e.EmployeeId == employeeId).SingleOrDefault();
            contex.Employees.Remove(employee);
            contex.SaveChanges();
            return new JsonResult("Employee data deleted successfully");
        }

        [HttpGet]
        public JsonResult Edit(int employeeId)
        {
            var employee = contex.Employees.Where(e => e.EmployeeId == employeeId).SingleOrDefault();
            return new JsonResult(employee);
        }

        [HttpPost]
        public IActionResult UpDATE(Employee employee)
        {
            contex.Employees.Update(employee);
            contex.SaveChanges();
            return new JsonResult("Employee data updated");
        }


    }
}

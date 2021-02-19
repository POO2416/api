using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace retrieve_data.Models
{
    public class TodoItems
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
       
        public string Secret { get; set; }

        public string Dep { get; set; }


    }
}

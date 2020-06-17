using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiTriqui.Models;

namespace ApiTriqui.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TiposIdentificacionsController : ControllerBase
    {
        private readonly TriquiAPIContext _context;

        public TiposIdentificacionsController(TriquiAPIContext context)
        {
            _context = context;
        }

        // GET: api/TiposIdentificacions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TiposIdentificacion>>> GetTiposIdentificacion()
        {
            var list = await _context.TiposIdentificacion.ToListAsync();
            return new JsonResult(new {status = 200, result = list });
        }

        // GET: api/TiposIdentificacions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TiposIdentificacion>> GetTiposIdentificacion(int id)
        {
            var tiposIdentificacion = await _context.TiposIdentificacion.FindAsync(id);

            if (tiposIdentificacion == null)
            {
                return NotFound();
            }

            return tiposIdentificacion;
        }

        // PUT: api/TiposIdentificacions/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTiposIdentificacion(int id, TiposIdentificacion tiposIdentificacion)
        {
            if (id != tiposIdentificacion.Id)
            {
                return BadRequest();
            }

            _context.Entry(tiposIdentificacion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TiposIdentificacionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TiposIdentificacions
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TiposIdentificacion>> PostTiposIdentificacion(TiposIdentificacion tiposIdentificacion)
        {
            _context.TiposIdentificacion.Add(tiposIdentificacion);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTiposIdentificacion", new { id = tiposIdentificacion.Id }, tiposIdentificacion);
        }

        // DELETE: api/TiposIdentificacions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TiposIdentificacion>> DeleteTiposIdentificacion(int id)
        {
            var tiposIdentificacion = await _context.TiposIdentificacion.FindAsync(id);
            if (tiposIdentificacion == null)
            {
                return NotFound();
            }

            _context.TiposIdentificacion.Remove(tiposIdentificacion);
            await _context.SaveChangesAsync();

            return tiposIdentificacion;
        }

        private bool TiposIdentificacionExists(int id)
        {
            return _context.TiposIdentificacion.Any(e => e.Id == id);
        }
    }
}

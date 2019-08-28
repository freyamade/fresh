extern crate fixedbitset;
extern crate js_sys;

use fixedbitset::FixedBitSet;
use wasm_bindgen::prelude::*;
use web_sys::CanvasRenderingContext2d;

#[wasm_bindgen]
pub struct Universe {
    width: u32,
    height: u32,
    cells: FixedBitSet,
    cell_size: u32,
    alive_colour: JsValue,
    dead_colour: JsValue,
    grid_colour: JsValue,
}

// Private Methods
impl Universe {
    fn get_index(&self, row: u32, col: u32) -> usize {
        return (row * self.width + col) as usize;
    }

    fn live_neighbour_count(&self, row: u32, col: u32) -> u8 {
        let mut count = 0;

        // Use modulo arithmetic to check the rows and cols around the cell
        for delta_row in [self.height - 1, 0, 1].iter().cloned() {
            for delta_col in [self.width - 1, 0, 1].iter().cloned() {
                // Ignore the cell itself since we're looking for neighbours
                if delta_row == 0 && delta_col == 0 {
                    continue;
                }

                // Use modulo arithmetic to avoid dealing with edge cases for the literal edges of the world
                let neighbour_row = (row + delta_row) % self.height;
                let neighbour_col = (col + delta_col) % self.width;
                let index = self.get_index(neighbour_row, neighbour_col);

                // Check if the neighbour cell is alive
                count += self.cells[index] as u8;
            }
        }
        return count;
    }

    fn draw_grid(&self, ctx: &CanvasRenderingContext2d) {
        ctx.begin_path();
        ctx.set_stroke_style(&self.grid_colour);

        // Vertical lines (go out to width to draw a border around the canvas)
        let height = ((self.cell_size + 1) * self.height + 1) as f64;
        for i in 0..(self.height + 1) {
            let line_x = (i * (self.cell_size + 1) + 1) as f64;
            ctx.move_to(line_x, 0.0);
            ctx.line_to(line_x, height);
        }

        // Horizontal lines (go out to height to draw a border around the canvas)
        let width = ((self.cell_size + 1) * self.width + 1) as f64;
        for i in 0..(self.width + 1) {
            let line_y = (i * (self.cell_size + 1) + 1) as f64;
            ctx.move_to(0.0, line_y);
            ctx.line_to(width, line_y);
        }

        // Draw the lines
        ctx.stroke()
    }

    fn draw_cells(&self, ctx: &CanvasRenderingContext2d) {
        ctx.begin_path();

        // Iterate through the rows and columns, and draw the cell if it's active
        for row in 0..self.height {
            for col in 0..self.width {
                let index = self.get_index(row, col);
                if self.cells[index] {
                    ctx.set_fill_style(&self.alive_colour);
                }
                else {
                    ctx.set_fill_style(&self.dead_colour);
                }

                // Draw the cell
                let x = (col * (self.cell_size + 1) + 1) as f64;
                let y = (row * (self.cell_size + 1) + 1) as f64;
                let size = self.cell_size as f64;
                ctx.fill_rect(x, y, size, size);
            }
        }
    }
}

// Public Methods
#[wasm_bindgen]
impl Universe {

    // Constructor
    pub fn new(width: u32, height: u32) -> Universe {
        let size = (width * height) as usize;
        let mut cells = FixedBitSet::with_capacity(size);

        for i in 0..size {
            cells.set(i, js_sys::Math::random() >= 0.5);
        }

        let cell_size: u32 = 5;
        let alive_colour: JsValue = JsValue::from_str("#eeeee9");
        let dead_colour: JsValue = JsValue::from_str("#18191c");
        let grid_colour: JsValue = JsValue::from_str("#42454d");

        return Universe {
            width,
            height,
            cells,
            cell_size,
            alive_colour,
            dead_colour,
            grid_colour,
        };
    }

    // Update the states of each cell in the window.
    pub fn tick(&mut self) {
        let mut next_gen = self.cells.clone();

        for row in 0..self.height {
            for col in 0..self.width {
                // Get the cell at the current position and determine if it should live or die
                let index = self.get_index(row, col);
                let cell = self.cells[index];
                let live_neighbours = self.live_neighbour_count(row, col);

                // Use pattern matching to determine the state of the cell in the next generation
                let next_cell = match (cell, live_neighbours) {
                    // Rule 1.
                    // Any live cell with less than 2 live neighbours will die from under-population
                    (true, x) if x < 2 => false,

                    // Rule 2.
                    // Any live cell with 2 or 3 live neighbours lives on to the next generation
                    (true, 2) | (true, 3) => true,

                    // Rule 3.
                    // Any live cell with more than 3 live neighbours will die from over-population
                    (true, x) if x > 3 => false,

                    // Rule 4.
                    // Any dead cell with exactly three neighbours becomes a live cell through reproduction
                    (false, 3) => true,

                    // Otherwise, cell remains as is.
                    (otherwise, _) => otherwise,
                };

                // Update the next generation cell at the given index
                next_gen.set(index, next_cell);
            }
        }

        // Update the cells vector to be the new calculated cell vector
        self.cells = next_gen;
    }

    // Given a canvas context, draw the current generation of the universe.
    pub fn render(&self, ctx: &CanvasRenderingContext2d) {
        self.draw_grid(ctx);
        self.draw_cells(ctx);
    }

    // Getters
    pub fn cell_size(&self) -> u32 {
        return self.cell_size;
    }
}

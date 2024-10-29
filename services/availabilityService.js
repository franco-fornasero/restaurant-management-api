import { el } from '@faker-js/faker';
import Table from '../models/table.js';

const availabilityService = {
    async checkTableAvailability(guests, date) {
        // get all tables from the database
        const tables = await Table.find();

        // check if there are a non-combinable table with the same number of seats
        const nonCombinableTable = tables.find(table => table.capacity === guests && !table.combinable);

        // if there is a non-combinable table with the same number of seats, return it
        if (!nonCombinableTable) {
            // check if there is a combinable table with the same number of seats
            let combinableTable = tables.find(table => table.capacity === guests && table.combinable);

            if (combinableTable) {
                return combinableTable;
            }

            // find the next non-combinable table that is bigger than the number of guests and has the least number of unused seats
            let nextNonCombinableTable = tables
                .filter(table => table.capacity > guests && !table.combinable)
                .sort((a, b) => a.capacity - b.capacity)

            nextNonCombinableTable = nextNonCombinableTable[0];

            // calculate the number of unused seats
            let unusedSeatsNonCombinable = 0;
            if (nextNonCombinableTable) {
                unusedSeatsNonCombinable = nextNonCombinableTable.capacity - guests;
            }

            // find the next combinable table that is bigger than the number of guests and has the least number of unused seats
            let nextCombinableTable = tables
                .filter(table => table.capacity > guests && table.combinable)
                .sort((a, b) => a.capacity - b.capacity)

            nextCombinableTable = nextCombinableTable[0];

            // calculate the number of unused seats
            let unusedSeatsCombinable = 0;
            if (nextCombinableTable) {
                unusedSeatsCombinable = nextCombinableTable.capacity - guests;
            }

            // find the table with the least number of unused seats
            let table = null;
            if (unusedSeatsNonCombinable <= unusedSeatsCombinable && unusedSeatsCombinable !== 0) {
                table = nextNonCombinableTable;
            } else if (unusedSeatsCombinable !== 0) {
                table = nextCombinableTable;
            }

            /* **************************************************** */
            // now we need to check if we can combine tables to accommodate the guests

            let seats = 0;
            let tablesCombined = [];
            while (seats < guests) {
                // find the next combinable table that is smaller than the number of guests and has the least number of unused seats
                let nextCombinableTable = tables
                    .filter(table => table.capacity < guests && table.combinable)
                    .sort((a, b) => b.capacity - a.capacity)

                nextCombinableTable = nextCombinableTable[0];

                // if there is a combinable table that is smaller than the number of guests, save it
                if (nextCombinableTable) {
                    seats += nextCombinableTable.capacity;
                    tablesCombined.push(nextCombinableTable);
                } else {
                    // if there is no combinable table that is smaller than the number of guests, find the next combinable table that is bigger than the number of guests and has the least number of unused seats
                    let nextCombinableTable = tables
                        .filter(table => table.capacity > guests && table.combinable)
                        .sort((a, b) => a.capacity - b.capacity)

                    nextCombinableTable = nextCombinableTable[0];

                    // if there is a combinable table that is bigger than the number of guests, save it
                    if (nextCombinableTable) {
                        seats += nextCombinableTable.capacity;
                        tablesCombined.push(nextCombinableTable);
                    } else {
                        // in this point, we can't combine tables to accommodate the guests. So, we need to break the loop
                        seats = 0;
                        break;
                    }
                }
            }

            // if we can combine tables to accommodate the guests, we need to check if it is better than the previous table
            if (seats != 0) {
                let unusedSeatsCombinables = seats - guests;
                let unusedSeatsGreaterCapacity = table.capacity - guests;

                if (unusedSeatsCombinables < unusedSeatsGreaterCapacity) {
                    table = tablesCombined;
                }
            }

            return table;

        } else {
            return nonCombinableTable;
        }
    }
}

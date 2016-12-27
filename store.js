"use strict";

function statement(customer, movies, format) {

    function movieFor(rental){
        return movies[rental.movieID];
    }

    function getAmount(rental) {
        let movie = movieFor(rental);
        let thisAmount = 0;
        // determine amount for each movie
        switch (movie.code) {
            case "regular":
                thisAmount = 2;
                if (rental.days > 2) {
                    thisAmount += (rental.days - 2) * 1.5;
                }
                break;
            case "new":
                thisAmount = rental.days * 3;
                break;
            case "childrens":
                thisAmount = 1.5;
                if (rental.days > 3) {
                    thisAmount += (rental.days - 3) * 1.5;
                }
                break;
        }
        return thisAmount;
    }

    function getTotalFrequentRenterPoints(customer) {
        let totalFrequentRenterPoints = 0;

        for (let rental of customer.rentals) {
            totalFrequentRenterPoints += (movieFor(rental).code === "new" && rental.days > 2) ? 2 : 1;
        }
        return totalFrequentRenterPoints;
    }

    function getTotalAmount(customer) {
        let totalAmount = 0;
        for (let rental of customer.rentals) {
            totalAmount += getAmount(rental);
        }
        return totalAmount;
    }

    function statementTxt() {
        let result = `Rental Record for ${customer.name}\n`;
        for (let rental of customer.rentals) {
            result += `\t${movieFor(rental).title}\t${getAmount(rental)}\n`;
        }
        result += `Amount owed is ${getTotalAmount(customer)}\n`;
        result += `You earned ${getTotalFrequentRenterPoints(customer)} frequent renter points\n`;
        return result;
    }

    function statementHtml() {
        let result = `<h2>Rental Record for ${customer.name}</h2>`;
        result += "<table>";
        for (let rental of customer.rentals) {
            result += `<tr><td>${movieFor(rental).title}</td><td>${getAmount(rental)}</td></tr>`;
        }
        result += "</table>";
        result += `<p>Amount owed is <em>${getTotalAmount(customer)}</em></p>`;
        result += `<p>You earned <em>${getTotalFrequentRenterPoints(customer)}</em> frequent renter points</p>`;
        return result;
    }

    switch (format){
        case 'txt': return statementTxt();
        case 'html': return statementHtml();
        default: throw new Error(`unknown format ${format}`);
    }
}

let customer = {
    name: "martin",
    rentals: [{
        "movieID": "F001",
        "days": 3
    }, {
        "movieID": "F002",
        "days": 1
    },]
};

let movies = {
    "F001": {
        "title": "Ran",
        "code": "regular"
    },
    "F002": {
        "title": "Trois Couleurs: Bleu",
        "code": "regular"
    },
    // etc
};

console.log(statement(customer, movies, 'html'));
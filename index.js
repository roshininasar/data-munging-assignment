var fs=require('fs');
var ln = require('readline').createInterface({
  input: fs.createReadStream('FoodFacts.csv')
});

var country = ['Netherlands', 'Canada', 'United Kingdom' , 'United States' , 'Australia' , 'France' , 'Germany' , 'Spain', 'South Africa'];
var data=[],final_1=[],final_c=[];
var region=['northEurope','centralEurope','southEurope'];
var northEurope = ['United Kingdom', 'Denmark', 'Sweden', 'Norway'];
var centralEurope = ['France', 'Belgium', 'Germany', 'Switzerland', 'Netherlands'];
var southEurope = ['Portugal', 'Greece', 'Italy', 'Spain', 'Croatia', 'Albania'];
var sugarindex=0,saltindex=0,countryindex=0,countryv = 0,sugar = 0,salt = 0,i=0;
var carbohydrateindex=0,fatindex=0,proteinindex=0,countryindex=0;
var countryv = 0,Carbohydrates = 0,fat = 0,protein=0,i=0;
var Carbohydratesv = Array(3).fill(0);
var fatv = Array(3).fill(0);
var proteinv = Array(3).fill(0);
var sugarv = Array(9).fill(0);
var saltv = Array(9).fill(0);

ln.on('line', function (line) {
data=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  

while(i<1) 
  {
    countryindex=data.indexOf('countries_en');
    sugarindex=data.indexOf('sugars_100g');
    saltindex=data.indexOf('salt_100g');
    fatindex=data.indexOf('fat_100g');
    proteinindex=data.indexOf('proteins_100g');
    carbohydrateindex=data.indexOf('carbohydrates_100g');
    i++;
  }

countryv=data[countryindex];
sugar=data[sugarindex];
//console.log(sugar);
salt=data[saltindex];
fat=data[fatindex];
protein=data[proteinindex];
carbohydrate=data[carbohydrateindex];
   if(salt=="") salt=0;
   if(sugar=="") sugar=0;
      if(fat=="")  fat=0;
   if(protein=="") protein=0;
   if(carbohydrate==""){carbohydrate=0;}
 

var index=country.indexOf(countryv);
     if(index!=-1)
     {
      sugarv[index]+=parseFloat(sugar);
      saltv[index]+=parseFloat(salt);
    }
    var aa=northEurope.indexOf(countryv);
      if(aa!=-1)
     {
      proteinv[0]+=parseFloat(protein);
      Carbohydratesv[0]+=parseFloat(carbohydrate);
      fatv[0]+=parseFloat(fat);
    } 
 
      var cc=centralEurope.indexOf(countryv);
     if(cc!=-1)
     {
      proteinv[1]+=parseFloat(protein);
      Carbohydratesv[1]+=parseFloat(carbohydrate);
      fatv[1]+=parseFloat(fat);
    }
     var bb=southEurope.indexOf(countryv);

    if(bb!=-1)
     {
      proteinv[2]+=parseFloat(protein);
      Carbohydratesv[2]+=parseFloat(carbohydrate);
      fatv[2]+=parseFloat(fat);
    }


});

ln.on('close', function() {
  for(var h=0;h<country.length;h++) {
    final_1.push({Country:country[h],
    Sugar:sugarv[h],
    Salt:saltv[h]

  });
  }
    for(var h1=0;h1<region.length;h1++) {
    final_c.push({Region:region[h1],
    Carbohydrates:Carbohydratesv[h1],
    fat:fatv[h1],
    protein:proteinv[h1]
  });
   
}    

console.log(final_1);
console.log(final_c);
fs.writeFileSync('chart1.json', JSON.stringify(final_1));    
fs.writeFileSync('chart2.json', JSON.stringify(final_c));
});

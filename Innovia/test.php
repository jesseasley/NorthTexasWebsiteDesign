<?php
/*
expected inputs;
mls: mls number of a Property | LM_MST_mls_noYYNT=value passed
city: city name to query 
	must be in denton county
	look up city code using the encodeCity function in this file
	LM_MST_cityYNCL%5B%5D repeats for each city code
	imput: Plano|LEWISVILLE	
		split on pipe and add tag for each city (at least one even if blank)
minBeds: minimum number of beds | LM_MST_bdrmsYNNB=value passed
maxBeds: maximum number of beds | LM_MST_bdrmsYNNE=value passed
minBaths: minimum number of full baths | LM_MST_bathsYNNB=value passed
maxBaths: maximum number of full baths | LM_MST_bathsYNNE=value passed
minHalfBath: minimum number of half baths | LM_MST_hbathYNNB=value passed
maxHalfBath: maximum number of half baths | LM_MST_hbathYNNE=value passed
minPrice: lowest price to query for | LM_MST_list_prcYNNB=value passed
maxPrice: maximum price to query for | LM_MST_list_prcYNNE=value passed
minSqft: | LM_MST_sqft_nYNNB=value passed
maxSqft | LM_MST_sqft_nYNNE=value passed
minGarage | LM_MST_gar_carsYNNB=value passed
acre | cff%5B%5D=value passed
	pass as follows
		0=zero lot				| cff%5B%5D=c08
		0-.5=less than .5 acre		| cff%5B%5D=c04
		.5-1=.5 to .99 acre		| cff%5B%5D=c03
		1-3=1 to 2.99 acre		| cff%5B%5D=c01
		3-5=3 to 4.99 acre		| cff%5B%5D=c05
		5-10=5 to 9.99 acre		| cff%5B%5D=c07
		10-100=10 to 100 acre		| cff%5B%5D=c06
		>100=over 100 acre			| cff%5B%5D=c02
	look up acre code using the encodeAcre function in this file
pool | LM_MST_pool_ynYNCL%5B%5D=value passed (pass as pool=Y)
streetNo | LM_MST_str_noY1VZ=value passed 
streetName | LM_MST_str_namY1VZ=value passed 
subdivision | LM_MST_subdivY1VZ=value passed 
zipCode | LM_MST_zipY1VZ=value passed 
propertType | LM_MST_prop_cdYNNL%5B%5D=value passed 
	pass as follows
		1=Single Family (default)
		2=Duplex
		3=Condo
		4=Townhouse
mstrFirstLevel | LM_MST_mbr_levYNCL%5B%5D=value passed (pass as mstrFirstLevel=1)

*/
//echo encodeCity("flower mound") . "\n\n\n";
$type = valueOf("request", "type");
if ($type == "")
	$type = "1";
  
//$featured = valueOf("request", "featured");
//tested
$inmls = valueOf("request", "mls");
$city = valueOf("request", "city");
$minPrice = valueOf("request", "minPrice");
$maxPrice = valueOf("request", "maxPrice");
$acre = encodeAcre(valueOf("request", "acre"));
$minBeds = valueOf("request", "minBeds");
$maxBeds = valueOf("request", "maxBeds");
$minBaths = valueOf("request", "minBaths");
$maxBaths = valueOf("request", "maxBaths");
$minHalfBath = valueOf("request", "minHalfBath");
$minSqft = valueOf("request", "minSqft");
$maxSqft = valueOf("request", "maxSqft");
$minGarage = valueOf("request", "minGarage");
$pool = valueOf("request", "pool");
$streetNo = valueOf("request", "streetNo");
$zipCode = valueOf("request", "zipCode");

$maxHalfBath = valueOf("request", "maxHalfBath");
$streetName = valueOf("request", "streetName");
$subdivision = valueOf("request", "subdivision");
$propertType = valueOf("request", "propertType");
$mstrFirstLevel = valueOf("request", "mstrFirstLevel");

$max = intval($maxPrice);
$min = intval($minPrice);

$blend = $max - $min;
$active = "";
$url = "http://innovia.ntreis.net/ntr/idx/search.php";
$url .= "?LM_MST_prop_fmtYNNT=1";
$url .= "&LM_MST_prop_cdYYNT=1%2C2%2C3%2C4%2C5";
$url .= "&LM_MST_cffXX6I=LM_MST_cff+like+'%25v01%25'";
$url .= "&LM_MST_mls_noYYNT=" . $inmls;
$url .= "&LM_MST_list_prcYNNB=" . $minPrice;
$url .= "&LM_MST_list_prcYNNE=" . $maxPrice;
$url .= "&LM_MST_bdrmsYNNB=" . $minBeds;
$url .= "&LM_MST_bdrmsYNNE=" . $maxBeds;
$url .= "&LM_MST_bathsYNNB=" . $minBaths;
$url .= "&LM_MST_bathsYNNE=" . $maxBaths;
$url .= "&LM_MST_hbathYNNB=" . $minHalfBath;
$url .= "&LM_MST_hbathYNNE=" . $maxHalfBath;
$url .= "&LM_MST_acresYNNB=";
$url .= "&LM_MST_acresYNNE=";
$url .= "&LM_MST_str_noY1VZ=" . $streetNo;
$url .= "&LM_MST_str_namY1VZ=" . $streetName;
$url .= "&LM_MST_yr_bltYNNB=";
$url .= "&LM_MST_yr_bltYNNE=";
$url .= "&LM_MST_subdivY1VZ=" . $subdivision;
$url .= "&LM_MST_zipY1VZ=" . $zipCode;
$url .= "&LM_MST_sqft_nYNNB=" . $minSqft;
$url .= "&LM_MST_sqft_nYNNE=" . $maxSqft;
$url .= "&LM_MST_gar_carsYNNB=" . $minGarage;
$url .= "&LM_MST_gar_carsYNNE=";
$url .= "&LM_MST_prop_cdYNNL%5B%5D=" . $propertType;
$url .= "&LM_MST_mbr_levYNCL%5B%5D=" . $mstrFirstLevel;
$url .= "&cff%5B%5D=" . $acre; 
$url .= "&LM_MST_cffIXNF=" . $acre; 
$url .= "&LM_MST_pool_ynYNCL%5B%5D=" . $pool;
$url .= "&LM_MST_cityYNCL%5B%5D=" . encodeCity($city);
$url .= "&openHouseStartDt_B=";
$url .= "&openHouseStartDt_E=";
$url .= "&ve_info=";
$url .= "&ve_rgns=1";
$url .= "&LM_MST_LATXX6I=";
$url .= "&poi=";
$url .= "&count=1";
$url .= "&key=f36a93da0cb741a45c2fca07af0fb4ce";
$url .= "&isLink=0";
$url .= "&custom=";
//echo $url . "\n\n";
$curl = curl_init($url); 
    curl_setopt($curl, CURLOPT_FAILONERROR, true); 
	curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true); 
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true); 
	curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false); 
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);   

    //get the results of the api call
    $xml = curl_exec($curl); 
//echo $xml . "\n\n";

$start = strpos($xml, "contentcolumn");
$end = strpos($xml, "infoBox", $start);
$end = strpos($xml, "</div>", $end+1);
$end = strpos($xml, "</div>", $end+1);
$end = strpos($xml, "</div>", $end+1);

$html = "";
$url = "";
while ($start > 0){
	$html .= "   <Row ";
	$html .= "address='" . getAddress(substr($xml, $start, $end)) . "' ";
	$html .= "\n      img='" . getImage(substr($xml, $start, $end)) . "' ";
	$html .= "bed='" . getBed(substr($xml, $start, $end)) . "' ";
	//$html .= "bath='" . getBath(substr($xml, $start, $end)) . "' ";
	$html .= "sqft='" . getSqFt(substr($xml, $start, $end)) . "' ";
	$html .= "mlsNo='" . getMLS(substr($xml, $start, $end)) . "' ";
	$html .= "price='". getPrice(substr($xml, $start, $end)) . "' ";
	$html .= "\n      pool='". getPool(substr($xml, $start, $end)) . "' ";
	$html .= "yearBuilt='". getYearBuilt(substr($xml, $start, $end)) . "' ";
	$html .= "baths='". getBaths(substr($xml, $start, $end)) . "' ";
	$html .= "acres='". getAcres(substr($xml, $start, $end)) . "' ";
	$html .= "propertyType='". getPropertyType(substr($xml, $start, $end)) . "' ";
	$html .= "fullAddr='". getFullAddr(substr($xml, $start, $end)) . "' ";
	$html .= "\n      propertyCategory='". getPropertyCategory(substr($xml, $start, $end)) . "' ";
	$html .= "garage='". getGarage(substr($xml, $start, $end)) . "' ";
	$html .= ">\n";
	$html .= "      <url><![CDATA[" . getURL(substr($xml, $start, $end)) . "]]></url>\n";
	$html .= "   </Row>\n";

	$start = strpos($xml, "contentcolumn", $start + 1);
	$end = strpos($xml, "infoBox", $start);
	$end = strpos($xml, "</div>", $end+1);
	$end = strpos($xml, "</div>", $end+1);
	$end = strpos($xml, "</div>", $end+1);
}
$html = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" .
	"<?xml-stylesheet type=\"text/xsl\" href=\"test.xsl\"?>\n" .
	"<root>\n" . $html . "</root>\n";

if (strpos($html, "img") == 0)
  $html = "No listings found for " . $city;

echo $html;
function getPool($xml){
	$key = "Pool:";
	$ts = strpos($xml, $key) + strlen($key);
	$key = "<span>";
	$ts = strpos($xml, $key, $ts) + strlen($key);
	$te = strpos($xml, "<", $ts);
	return trim(str_replace("\n", "", substr($xml, $ts, $te-$ts)));
}
function getYearBuilt($xml){
	$key = "Year Built:";
	$ts = strpos($xml, $key) + strlen($key);
	$key = "<span class=year>";
	$ts = strpos($xml, $key, $ts) + strlen($key);
	$te = strpos($xml, "<", $ts);
	return trim(str_replace("\n", "", substr($xml, $ts, $te-$ts)));
}
function getBaths($xml){
	$key = "Bathrooms:";
	$ts1 = strpos($xml, $key) + strlen($key);
	$key = "<span class=baths>";
	$ts2 = strpos($xml, $key, $ts1) + strlen($key);
	$te = strpos($xml, "<", $ts2);
	$a1 = substr($xml, $ts2, $te-$ts2);
	$key = "<span class=hbaths>";
	$ts2 = strpos($xml, $key, $ts1) + strlen($key);
	$te = strpos($xml, "<", $ts2);
	$a2 = substr($xml, $ts2, $te-$ts2);
	if ($a2 == "0 half")
		return trim(str_replace(",", "", $a1));
	else
		return trim($a1 . $a2);
}
function getAcres($xml){
	$key = "Acres:";
	$ts = strpos($xml, $key) + strlen($key);
	$key = "<span class=units>";
	$ts = strpos($xml, $key, $ts) + strlen($key);
	$te = strpos($xml, "<", $ts);
	return trim(str_replace("\n", "", substr($xml, $ts, $te-$ts)));
}
function getPropertyType($xml){
	$key = "Type:";
	$ts = strpos($xml, $key) + strlen($key);
	$key = "<span class=sqft>";
	$ts = strpos($xml, $key, $ts) + strlen($key);
	$te = strpos($xml, "<", $ts);
	return trim(str_replace("\n", "", substr($xml, $ts, $te-$ts)));
}
function getFullAddr($xml){
	$key = "data-ajax=false>";
	$ts = strpos($xml, $key) + strlen($key);
	$te = strpos($xml, "</a>", $ts);
	$a1 = trim(str_replace("\n", "", substr($xml, $ts, $te-$ts)));
	$a1 = str_replace("<br>", "", $a1);
	$a1 = str_replace("  ", " ", $a1);
	$a1 = str_replace("           ", " ", $a1);
	return $a1;
}
function getPropertyCategory($xml){
	$key = "Category:";
	$ts = strpos($xml, $key) + strlen($key);
	$key = "<span class=year>";
	$ts = strpos($xml, $key, $ts) + strlen($key);
	$te = strpos($xml, "<", $ts);
	return trim(str_replace("\n", "", substr($xml, $ts, $te-$ts)));
}
function getGarage($xml){
	$key = "Gar/CP/TCP:";
	$ts = strpos($xml, $key) + strlen($key);
	$key = "<span class=beds>";
	$ts = strpos($xml, $key, $ts) + strlen($key);
	$te = strpos($xml, "<", $ts);
	$a1 = trim(str_replace("\n", "", substr($xml, $ts, $te-$ts)));
	$a1 = str_replace(" / ", "/", $a1);
	return $a1;
}
function getAddress($xml){
	$ts = strpos($xml, "infoBox");
	$ts = strpos($xml, "<span>", $ts) + 6;
	$te = strpos($xml, "<", $ts);
	$a1 = str_replace("  ", " ", substr($xml, $ts, $te-$ts));
	$ts = strpos($xml, "<span>", $te) + 6;
	$te = strpos($xml, "<", $ts);
	$a2 = trim(substr($xml, $ts, $te-$ts));
	return $a1 . " " . $a2;
}
function getMLS($xml){
	$ts = strpos($xml, "infoBox");
	$ts = strpos($xml, "</b>", $ts) + 4;
	$te = strpos($xml, "<", $ts);
	$a1 = substr($xml, $ts, $te-$ts);
	return trim(str_replace("\n", "", substr($xml, $ts, $te-$ts)));
}
function getImage($xml){
	$ts = strpos($xml, "infoBox");
	$ts = strpos($xml, "src=\"", $ts) + 5;
	$te = strpos($xml, "\"", $ts);
	$a1 = substr($xml, $ts, $te-$ts);
	$image = substr($xml, $ts, $te-$ts);
	$image = str_replace("thjpg", "highjpg", $image);
	return "http://innovia.ntreis.net" . $image;
}
function getPrice($xml){
	$ts = strpos($xml, "infoBox");
	$ts = strpos($xml, "<strong>", $ts) + 8;
	$te = strpos($xml, "<", $ts);
	$a1 = substr($xml, $ts, $te-$ts);
	return trim(str_replace("\n", "", substr($xml, $ts, $te-$ts)));
}
function getStatus($xml){
	$ts = strpos($xml, "infoBox");
	$ts = strpos($xml, "<li>", $ts) + 4;
	$ts = strpos($xml, "<li>", $ts) + 4;
	$te = strpos($xml, "<", $ts);
	$a1 = substr($xml, $ts, $te-$ts);
	return trim(str_replace("\n", "", substr($xml, $ts, $te-$ts)));
}
function getBed($xml){
	$ts = strpos($xml, "infoBox");
	$ts = strpos($xml, "<span>", $ts) + 6;
	$ts = strpos($xml, "<span>", $ts) + 6;
	$ts = strpos($xml, "<span>", $ts) + 6;
	$ts = strpos($xml, "<span>", $ts) + 6;
	$te = strpos($xml, "<", $ts);
	$a1 = substr($xml, $ts, $te-$ts);
	$a1 = str_replace("BR", "", $a1);
	$a1 = str_replace("/", "", $a1);
	return trim($a1);
}
function getBath($xml){
	$ts = strpos($xml, "infoBox");
	$ts = strpos($xml, "<span>", $ts) + 6;
	$ts = strpos($xml, "<span>", $ts) + 6;
	$ts = strpos($xml, "<span>", $ts) + 6;
	$ts = strpos($xml, "<span>", $ts) + 6;
	$ts = strpos($xml, "<span>", $ts) + 6;
	$ts = strpos($xml, "<span>", $ts) + 6;
	$te = strpos($xml, "<", $ts);
	$a1 = substr($xml, $ts, $te-$ts);
	return trim(str_replace("/", "", str_replace("\n", "", substr($xml, $ts, $te-$ts))));
}
function getSqFt($xml){
	$ts = strpos($xml, "infoBox");
	$ts = strpos($xml, "<span>", $ts) + 6;
	$ts = strpos($xml, "<span>", $ts) + 6;
	$ts = strpos($xml, "<span>", $ts) + 6;
	$ts = strpos($xml, "<span>", $ts) + 6;
	$ts = strpos($xml, "<span>", $ts) + 6;
	$ts = strpos($xml, "<span>", $ts) + 6;
	$ts = strpos($xml, "<span>", $ts) + 6;
	$te = strpos($xml, "<", $ts);
	$a1 = substr($xml, $ts, $te-$ts);
	return trim(str_replace("/", "", str_replace("\n", "", substr($xml, $ts, $te-$ts))));
}
function getKey($xml){
	$ts = strpos($xml, "infoBox");
	$ts = strpos($xml, "a href", $ts);
	$ts = strpos($xml, "'", $ts) + 1;
	$te = strpos($xml, "'", $ts);
	$a1 = substr($xml, $ts, $te-$ts);
	return trim(str_replace("\n", "", substr($xml, $ts, $te-$ts)));
}
function getURL($xml){
	return "http://innovia.ntreis.net/ntr/idx/index.php?key=" . getKey($xml) . "&mls=" . getMLS($xml);
}
function valueOf($class, $variable)
{
	$return = "";

	switch ($class)
	{
		case "cookie":
			if (isset($_COOKIE[$variable]))
				$return = $_COOKIE[$variable];
			break;
		case "post":
			if (isset($_POST[$variable]))
				$return = $_POST[$variable];
			break;
		case "get":
			if (isset($_GET[$variable]))
				$return = $_GET[$variable];
			break;
		case "request":
			if (isset($_REQUEST[$variable]))
				$return = $_REQUEST[$variable];
			break;
		case "server":
			if (isset($_SERVER[$variable]))
				$return = $_SERVER[$variable];
			break;
		default:
			$return = "";
	}

	return $return;
}
function encodeCity($cityName){
	//CD['42']['45']['61'] = ['Argyle|51', 'Aubrey|60', 'Bartonville|86', 'Bolivar|1778', 'Carrollton|241', 'Celina|255', 'Clark|1687', 'Coppell|322', 'Copper Canyon|323', 'Corinth|325', 'Corral City|327', 'Cross Roads|347', 'Dallas|364', 'Decatur|376', 'Denton|383', 'Dish|1707', 'Double Oak|408', 'Flower Mound|499', 'Fort Worth|514', 'Frisco|525', 'Grapevine|586', 'Hackberry|602', 'Haslet|627', 'Hebron|634', 'Hickory Creek|649', 'Highland Village|655', 'Justin|737', 'Krugerville|777', 'Krum|778', 'Lake Dallas|801', 'Lakewood Village|811', 'Lantana|818', 'Lewisville|839', 'Lincoln Park|844', 'Little Elm|851', 'Marshall Creek|912', 'No City|1675', 'Northlake|1064', 'Oak Point|1070', 'Pilot Point|1163', 'Plano|1172', 'Ponder|1185', 'Prosper|1215', 'Providence Village|1698', 'Rhome|1252', 'Roanoke|1273', 'Sanger|1346', 'Savannah|1681', 'Shady Shores|1377', 'Slidell|1394', 'Southlake|1411', 'The Colony|1479', 'Tioga|1492', 'Trophy Club|1511', 'Valley View|1536', 'Westlake|1584'];
	switch(strtoupper($cityName)){
		case "ARGYLE": $code=51; break;
		case "AUBREY": $code=60; break;
		case "BARTONVILLE": $code=86; break;
		case "BOLIVAR": $code=1778; break;
		case "CARROLLTON": $code=241; break;
		case "CELINA": $code=255; break;
		case "CLARK": $code=1687; break;
		case "COPPELL": $code=322; break;
		case "COPPER CANYON": $code=323; break;
		case "CORINTH": $code=325; break;
		case "CORRAL CITY": $code=327; break;
		case "CROSS ROADS": $code=347; break;
		case "DALLAS": $code=364; break;
		case "DECATUR": $code=376; break;
		case "DENTON": $code=383; break;
		case "DISH": $code=1707; break;
		case "DOUBLE OAK": $code=408; break;
		case "FLOWER MOUND": $code=499; break;
		case "FORT WORTH": $code=514; break;
		case "FRISCO": $code=525; break;
		case "GRAPEVINE": $code=586; break;
		case "HACKBERRY": $code=602; break;
		case "HASLET": $code=627; break;
		case "HEBRON": $code=634; break;
		case "HICKORY CREEK": $code=649; break;
		case "HIGHLAND VILLAGE": $code=655; break;
		case "JUSTIN": $code=737; break;
		case "KRUGERVILLE": $code=777; break;
		case "KRUM": $code=778; break;
		case "LAKE DALLAS": $code=801; break;
		case "LAKEWOOD VILLAGE": $code=811; break;
		case "LANTANA": $code=818; break;
		case "LEWISVILLE": $code=839; break;
		case "LINCOLN PARK": $code=844; break;
		case "LITTLE ELM": $code=851; break;
		case "MARSHALL CREEK": $code=912; break;
		case "NO CITY": $code=1675; break;
		case "NORTHLAKE": $code=1064; break;
		case "OAK POINT": $code=1070; break;
		case "PILOT POINT": $code=1163; break;
		case "PLANO": $code=1172; break;
		case "PONDER": $code=1185; break;
		case "PROSPER": $code=1215; break;
		case "PROVIDENCE VILLAGE": $code=1698; break;
		case "RHOME": $code=1252; break;
		case "ROANOKE": $code=1273; break;
		case "SANGER": $code=1346; break;
		case "SAVANNAH": $code=1681; break;
		case "SHADY SHORES": $code=1377; break;
		case "SLIDELL": $code=1394; break;
		case "SOUTHLAKE": $code=1411; break;
		case "THE COLONY": $code=1479; break;
		case "TIOGA": $code=1492; break;
		case "TROPHY CLUB": $code=1511; break;
		case "VALLEY VIEW": $code=1536; break;
		case "WESTLAKE": $code=1584; break;
		default: $code="";break;
	}
	return $code;
}
function encodeAcre($acreNo){
	//1=zero lot				| cff%5B%5D=c08
	//2=less than .5 acre		| cff%5B%5D=c04
	//3=.5 to .99 acre			| cff%5B%5D=c03
	//4=1 to 2.99 acre			| cff%5B%5D=c01
	//5=3 to 4.99 acre			| cff%5B%5D=c05
	//6=5 to 9.99 acre			| cff%5B%5D=c07
	//7=10 to 100 acre			| cff%5B%5D=c06
	//8=over 100 acre			| cff%5B%5D=c02

	switch ($acreNo){
		case "0": $acreCode="c08"; break;
		case "0-.5": $acreCode="c04"; break;
		case ".5-1": $acreCode="c03"; break;
		case "1-3": $acreCode="c01"; break;
		case "3-5": $acreCode="c05"; break;
		case "5-10": $acreCode="c07"; break;
		case "10-100": $acreCode="c06"; break;
		case ">100": $acreCode="c02"; break;
		default: $acreCode=""; break;
	}
	return $acreCode;
}
?>
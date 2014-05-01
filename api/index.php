<?php


///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
////////////////////////               ////////////////////////
////////////////////////     SLIM      ////////////////////////
////////////////////////               ////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


// LOAD FRAMEWORK
require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();

// CREATE SLIM INSTANCE
$app = new \Slim\Slim(array(
    'name' => 'timeAPI',
    'mode' => 'development'
//     'mode' => 'production'
));



///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
////////////////////////               ////////////////////////
////////////////////////   PARAMETERS  ////////////////////////
////////////////////////               ////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

// SLIM PARAMETERS
// Only invoked if mode is "production"
$app->configureMode('production', function () use ($app) {
    $app->config(array(
        'log.enable' => true,
        'debug' => false
    ));
});
// Only invoked if mode is "development"
$app->configureMode('development', function () use ($app) {
    $app->config(array(
        'log.enable' => true,
        'debug' => true
    ));
});

// DATA OUTPUT: JSON
$app->contentType('application/json');
// $app->response()->header("Content-Type", "application/json");

$response = $app->response();
$response['Content-Type'] = 'application/json';
$response['X-Powered-By'] = 'timeAPI';
$response->status(200);

// DATABASE PARAMS
$databasename = 'timecontrol';
$databasehost = 'localhost';
$databaseport = '5432';
$databaseuser = 'cronos';
$databasepassword = '';

// DATABASE CONNECTION
$db = new PDO("pgsql:dbname=$databasename;host=$databasehost;port=$databaseport;", $databaseuser, $databasepassword);

// TABLE NAMES
$tablename_project = "time_project";
$tablename_institution = "time_institution";
$tablename_person = "time_person";
$tablename_workpackage = "time_work_package";
$tablename_activity = "time_activity";
$tablename_activityeu = "time_activity_eu";
$tablename_activityinst = "time_activity_non_eu";
$tablename_timerecord = "time_time_record";
$tablename_bankaccount = "time_bank_account";
$tablename_institutionalias = "time_institution_alias";
$tablename_workrelation = "time_work_relation";
$tablename_user = "time_users";
$tablename_role = "time_roles";




///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
////////////////////////               ////////////////////////
////////////////////////   FUNCTIONS   ////////////////////////
////////////////////////               ////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


// BULLSHIT
/*
$app->get('/projects/:algo', function ($algo) use ($db, $app) {
		$resultid = $db->lastInsertId("time_project_id_seq");
		echo json_encode($algo);
});
$app->get('/projectsid', function () use ($db, $app) {
// 		$resultid = $db->lastInsertId("time_project_id_seq");
		$resultid = $db->lastInsertId('id');
		echo "$resultid";
});
*/




///////////////////////////////////////
////////////               ////////////
////////////    PROJECT    ////////////
////////////               ////////////
///////////////////////////////////////



// get all projects
$app->get('/project', function () use ($db, $app, $tablename_project) {
	$sql = 'SELECT pr.id AS id, pr.pname AS name, pr.pnumber AS number, pr.acronym AS acronym, pr.startdate AS start, pr.enddate AS end, pr.status AS status, pr.description AS description '
				.'FROM '.$tablename_project.' pr '
				.'ORDER BY pr.id';
	try {
// 		$db = getConnection();
		$stmt = $db->query($sql);  
 		$result = $stmt->fetchAll(PDO::FETCH_OBJ);
// 		$result = $stmt->fetchAll(PDO::FETCH_CLASS);
		$db = null;
		echo json_encode($result);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
})->name('getProjects');

// get project by ID
$app->get('/project/:id', function ($id) use ($db, $app, $tablename_project) {
	$sql = 'SELECT pr.id AS id, pr.pname AS name, pr.pnumber AS number, pr.acronym AS acronym, pr.startdate AS start, pr.enddate AS end, pr.status AS status, pr.description AS description '
				.'FROM '.$tablename_project.' pr '
				.'WHERE pr.id=:id';
	try {
// 		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$result = $stmt->fetchObject();  
		$db = null;
		echo json_encode($result);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
});
// })->name('getProject');

// create new project
$app->post('/project', function () use ($db, $app, $tablename_project) {
// 	$request = Slim::getInstance()->request();
// 	$result = json_decode($request->getBody());
	$result = json_decode($app->request->getBody());
	$sql = 'INSERT INTO '.$tablename_project.' (id, pnumber, pname, acronym, status, startdate, enddate, description) VALUES (nextval("public.time_project_id_seq"), :number, :name, :acronym, :status, :start, :end, :description)';
	try {
// 		$db = getConnection();
		$stmt = $db->prepare($sql);
// 		$stmt->bindParam("number", $result->number);
// 		$stmt->bindParam("name", $result->name);
// 		$stmt->bindParam("acronym", $result->acronym);
// 		$stmt->bindParam("status", $result->status);
// 		$stmt->bindParam("start", $result->start);
// 		$stmt->bindParam("end", $result->end);
// 		$stmt->bindParam("description", $result->description);
		$stmt->bindParam("number", $app->request->post('number'));
		$stmt->bindParam("name", $result->name);
		$stmt->bindParam("acronym", $result->acronym);
		$stmt->bindParam("status", $result->status);
		$stmt->bindParam("start", $result->start);
		$stmt->bindParam("end", $result->end);
		$stmt->bindParam("description", $result->description);
		$stmt->execute();
		$result->id = $db->lastInsertId();
		$db = null;
		echo json_encode($result); 
	} catch(PDOException $e) {
		error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
});
// })->name('createProject');

// update project by id
$app->put('/project/:id', function ($id) use ($db, $app) {
	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$result = json_decode($body);
	$sql = 'UPDATE '.$tablename_project.' SET pnumber=:number, name=:name, acronym=:acronym, status=:status, startdate=:start, enddate=:end, description=:description WHERE id=:id';
	try {
// 		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("number", $result->number);
		$stmt->bindParam("name", $result->name);
		$stmt->bindParam("acronym", $result->acronym);
		$stmt->bindParam("status", $result->status);
		$stmt->bindParam("start", $result->start);
		$stmt->bindParam("end", $result->end);
		$stmt->bindParam("description", $result->description);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo json_encode($result); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
});
// })->name('updateProject');

// delete project by id
$app->delete('/project/:id', function ($id) use ($db, $app) {
	$sql = 'DELETE FROM '.$tablename_project.' WHERE id=:id';
	try {
// 		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
});
// })->name('deleteProject');





///////////////////////////////////////
////////////               ////////////
////////////    PERSON     ////////////
////////////               ////////////
///////////////////////////////////////

// get all persons
$app->get('/person', function () use ($db, $app, $tablename_person, $tablename_user, $tablename_role) {
	$sql = 'SELECT pe.id AS id, pe.firstname AS name, pe.lastname AS surnames, pe.email AS email, r.rolename AS role, u.login AS login, u.password AS password, r.description AS description ' //  u.picture AS picture, u.description AS description, 
			.'FROM '.$tablename_person.' AS pe '
			.'INNER JOIN '.$tablename_user.' AS u ON pe.id = u.personid '
			.'INNER JOIN '.$tablename_role.' AS r ON u.roleid = r.id '
			.'ORDER BY pe.id';
	try {
// 		$db = getConnection();
		$stmt = $db->query($sql);  
 		$result = $stmt->fetchAll(PDO::FETCH_OBJ);
// 		$result = $stmt->fetchAll(PDO::FETCH_CLASS);
		$db = null;
		echo json_encode($result);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
});

// get person by ID
$app->get('/person/:id', function ($id) use ($db, $app, $tablename_person, $tablename_user, $tablename_role) {
	$sql = 'SELECT pe.id AS id, pe.firstname AS name, pe.lastname AS surnames, pe.email AS email, r.rolename AS role, u.login AS login, u.password AS password, r.description AS description ' // u.picture AS picture, u.description AS description, 
			.'FROM '.$tablename_person.' AS pe '
			.'JOIN '.$tablename_user.' AS u ON pe.id = u.personid '
			.'JOIN '.$tablename_role.' AS r ON u.roleid = r.id '
			.'WHERE pe.id=:id';
	try {
// 		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$result = $stmt->fetchObject();  
		$db = null;
		echo json_encode($result);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
});

// get projects of person by person ID
$app->get('/person/:id/projects', function ($id) use ($db, $app, $tablename_person, $tablename_workrelation, $tablename_project) {
	$sql = 'SELECT pr.id AS id, pr.pname AS name, pr.pnumber AS number, pr.acronym AS acronym, pr.startdate AS start, pr.enddate AS end, pr.status AS status, pr.description AS description '
			.'FROM '.$tablename_person.' pe '
			.'JOIN '.$tablename_workrelation.' wr ON pe.id = wr.personid '
			.'JOIN '.$tablename_project.' pr ON pr.id = wr.projectid '
			.'WHERE pe.id=:id';
	try {
// 		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$result = $stmt->fetchObject();  
		$db = null;
		echo json_encode($result);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
});

// get wrs of person by person ID
$app->get('/person/:id/wrs', function ($id) use ($db, $app, $tablename_person, $tablename_workrelation, $tablename_project, $tablename_institution) {
	$sql = 'SELECT wr.id AS id, wr.personid AS personid, pe.firstname AS personname, wr.institutionid AS institutionid, i.iname AS institutionname, wr.projectid AS projectid, wr.startdate AS start, wr.enddate AS end, pr.pname AS projectname ' // , wr.status AS status, wr.description AS description
			.'FROM '.$tablename_workrelation.' wr '
			.'INNER JOIN '.$tablename_person.' pe ON wr.personid = pe.id '
			.'INNER JOIN '.$tablename_institution.' i ON wr.institutionid = i.id '
			.'INNER JOIN '.$tablename_project.' pr ON wr.projectid = pr.id '
			.'WHERE pe.id=:id';
	try {
// 		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$result = $stmt->fetchObject();  
		$db = null;
		echo json_encode($result);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
});
			











///////////////////////////////////////
////////////               ////////////
////////////  WORK PACKAGE ////////////
////////////               ////////////
///////////////////////////////////////



// get all work packages
$app->get('/wps', function () use ($db, $app, $tablename_person, $tablename_user, $tablename_role) {
	$sql = 'SELECT pe.id AS id, pe.firstname AS name, pe.lastname AS surnames, pe.email AS email, r.rolename AS role, u.login AS login, u.password AS password, r.description AS description ' //  u.picture AS picture, u.description AS description, 
			.'FROM '.$tablename_person.' AS pe '
			.'INNER JOIN '.$tablename_user.' AS u ON pe.id = u.personid '
			.'INNER JOIN '.$tablename_role.' AS r ON u.roleid = r.id '
			.'ORDER BY pe.id';
	try {
// 		$db = getConnection();
		$stmt = $db->query($sql);  
 		$result = $stmt->fetchAll(PDO::FETCH_OBJ);
// 		$result = $stmt->fetchAll(PDO::FETCH_CLASS);
		$db = null;
		echo json_encode($result);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
});















///////////////////////////////////////
////////////               ////////////
//////////// WORK RELATION ////////////
////////////               ////////////
///////////////////////////////////////



// get all work relations
$app->get('/wrs', function () use ($db, $app, $tablename_workrelation, $tablename_person, $tablename_institution, $tablename_project) {
	$sql = 'SELECT wr.id AS id, wr.personid AS personid, pe.firstname AS personname, wr.institutionid AS institutionid, i.iname AS institutionname, wr.projectid AS projectid, wr.startdate AS start, wr.enddate AS end, pr.pname AS projectname ' // , wr.status AS status, wr.description AS description
			.'FROM '.$tablename_workrelation.' wr '
			.'INNER JOIN '.$tablename_person.' pe ON wr.personid = pe.id '
			.'INNER JOIN '.$tablename_institution.' i ON wr.institutionid = i.id '
			.'INNER JOIN '.$tablename_project.' pr ON wr.projectid = pr.id '
			.'ORDER BY wr.id';
	try {
// 		$db = getConnection();
		$stmt = $db->query($sql);  
 		$result = $stmt->fetchAll(PDO::FETCH_OBJ);
// 		$result = $stmt->fetchAll(PDO::FETCH_CLASS);
		$db = null;
		echo json_encode($result);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
});












///////////////////////////////////////
////////////               ////////////
////////////  INSTITUTION  ////////////
////////////               ////////////
///////////////////////////////////////



// get all institutions
$app->get('/inst', function () use ($db, $app, $tablename_institution) {
	$sql =  'SELECT i.id AS id, i.iname AS name, i.acronym AS acronym, i.pic AS pic, i.description AS description ' 
			.'FROM '.$tablename_institution.' i '
			.'ORDER BY i.id';
	try {
// 		$db = getConnection();
		$stmt = $db->query($sql);  
 		$result = $stmt->fetchAll(PDO::FETCH_OBJ);
// 		$result = $stmt->fetchAll(PDO::FETCH_CLASS);
		$db = null;
		echo json_encode($result);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
});

// get inst by ID
$app->get('/inst/:id', function ($id) use ($db, $app, $tablename_institution) {
	$sql = 'SELECT i.id AS id, i.iname AS name, i.acronym AS acronym, i.pic AS pic, i.description AS description ' 
			.'FROM '.$tablename_institution.' i '
			.'WHERE i.id=:id';
	try {
// 		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$result = $stmt->fetchObject();  
		$db = null;
		echo json_encode($result);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
});















///////////////////////////////////////
////////////               ////////////
////////////  BANK ACCOUNT ////////////
////////////               ////////////
///////////////////////////////////////



// get all bank accounts
$app->get('/account', function () use ($db, $app, $tablename_person, $tablename_user, $tablename_role) {
	$sql = 'SELECT pe.id AS id, pe.firstname AS name, pe.lastname AS surnames, pe.email AS email, r.rolename AS role, u.login AS login, u.password AS password, r.description AS description ' //  u.picture AS picture, u.description AS description, 
			.'FROM '.$tablename_person.' AS pe '
			.'INNER JOIN '.$tablename_user.' AS u ON pe.id = u.personid '
			.'INNER JOIN '.$tablename_role.' AS r ON u.roleid = r.id '
			.'ORDER BY pe.id';
	try {
// 		$db = getConnection();
		$stmt = $db->query($sql);  
 		$result = $stmt->fetchAll(PDO::FETCH_OBJ);
// 		$result = $stmt->fetchAll(PDO::FETCH_CLASS);
		$db = null;
		echo json_encode($result);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
});












///////////////////////////////////////
////////////               ////////////
////////////  ACTIVITY EU  ////////////
////////////               ////////////
///////////////////////////////////////



// get all EU activities
$app->get('/acteu', function () use ($db, $app, $tablename_person, $tablename_user, $tablename_role) {
	$sql = 'SELECT pe.id AS id, pe.firstname AS name, pe.lastname AS surnames, pe.email AS email, r.rolename AS role, u.login AS login, u.password AS password, r.description AS description ' //  u.picture AS picture, u.description AS description, 
			.'FROM '.$tablename_person.' AS pe '
			.'INNER JOIN '.$tablename_user.' AS u ON pe.id = u.personid '
			.'INNER JOIN '.$tablename_role.' AS r ON u.roleid = r.id '
			.'ORDER BY pe.id';
	try {
// 		$db = getConnection();
		$stmt = $db->query($sql);  
 		$result = $stmt->fetchAll(PDO::FETCH_OBJ);
// 		$result = $stmt->fetchAll(PDO::FETCH_CLASS);
		$db = null;
		echo json_encode($result);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
});















///////////////////////////////////////
////////////               ////////////
//////////// ACTIVITY INST ////////////
////////////               ////////////
///////////////////////////////////////



// get all institution activities
$app->get('/actinst', function () use ($db, $app, $tablename_person, $tablename_user, $tablename_role) {
	$sql = 'SELECT pe.id AS id, pe.firstname AS name, pe.lastname AS surnames, pe.email AS email, r.rolename AS role, u.login AS login, u.password AS password, r.description AS description ' //  u.picture AS picture, u.description AS description, 
			.'FROM '.$tablename_person.' AS pe '
			.'INNER JOIN '.$tablename_user.' AS u ON pe.id = u.personid '
			.'INNER JOIN '.$tablename_role.' AS r ON u.roleid = r.id '
			.'ORDER BY pe.id';
	try {
// 		$db = getConnection();
		$stmt = $db->query($sql);  
 		$result = $stmt->fetchAll(PDO::FETCH_OBJ);
// 		$result = $stmt->fetchAll(PDO::FETCH_CLASS);
		$db = null;
		echo json_encode($result);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
});















///////////////////////////////////////
////////////               ////////////
////////////   TIMERECORD  ////////////
////////////               ////////////
///////////////////////////////////////



// get all timerecords
$app->get('/timerecord', function () use ($db, $app, $tablename_person, $tablename_user, $tablename_role) {
	$sql = 'SELECT pe.id AS id, pe.firstname AS name, pe.lastname AS surnames, pe.email AS email, r.rolename AS role, u.login AS login, u.password AS password, r.description AS description ' //  u.picture AS picture, u.description AS description, 
			.'FROM '.$tablename_person.' AS pe '
			.'INNER JOIN '.$tablename_user.' AS u ON pe.id = u.personid '
			.'INNER JOIN '.$tablename_role.' AS r ON u.roleid = r.id '
			.'ORDER BY pe.id';
	try {
// 		$db = getConnection();
		$stmt = $db->query($sql);  
 		$result = $stmt->fetchAll(PDO::FETCH_OBJ);
// 		$result = $stmt->fetchAll(PDO::FETCH_CLASS);
		$db = null;
		echo json_encode($result);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
});







/*



*/



///////////////////////////////////////
////////////               ////////////
////////////   RESEARCHER  ////////////
////////////               ////////////
///////////////////////////////////////

/*
// get project by ID
$app->get('/res/:id', function ($id) use ($db, $app) {
	$person = "SELECT id, pname AS name, pnumber AS number, acronym, startdate AS start, enddate AS end, status, description ".
			"FROM time_project ".
			"WHERE id=:id";
	$projects = "SELECT id, pname AS name, pnumber AS number, acronym, startdate AS start, enddate AS end, status, description ".
			"FROM time_project ".
			"WHERE id=:id";
	$sql = "SELECT id, pname AS name, pnumber AS number, acronym, startdate AS start, enddate AS end, status, description ".
			"FROM time_project ".
			"WHERE id=:id";
			
	$person = 'SELECT pe.id AS id, pe.firstname AS name, pe.lastname AS surnames, pe.email AS email, r.rolename AS role, u.login AS login, u.password AS password, u.description AS description ' // u.picture AS picture, 
				.'FROM '.$tablename_person.' AS pe '
				.'JOIN '.$tablename_user.' AS u ON pe.id = u.personid '
				.'JOIN '.$tablename_role.' AS r ON u.roleid = r.id '
				.'WHERE pe.id=:id';
	$projects = 'SELECT pr.id AS id, pr.pname AS name, pr.pnumber AS number, pr.acronym AS acronym, pr.startdate AS start, pr.enddate AS end, pr.status AS status, pr.description AS description '
				.'FROM '.$tablename_person.' AS pe '
				.'JOIN '.$tablename_wrs.' AS wr ON pe.id = wr.personid '
				.'JOIN '.$tablename_project.' AS pr ON pr.id = wr.projectid '
				.'WHERE pe.id=:id';
	$wps
	$wrs
	$insts
	$intalias
	$euacts
	$instacts
	$bankaccounts
	$timerecords

	try {
// 		$db = getConnection();


		$stmt = $db->prepare($person);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$resperson = $stmt->fetchObject();

		$stmt = $db->prepare($projects);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$resprojects = $stmt->fetchObject();

		$stmt = $db->prepare($wps);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$reswps = $stmt->fetchObject();

		$stmt = $db->prepare($wrs);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$reswrs = $stmt->fetchObject();

		$stmt = $db->prepare($insts);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$resinsts = $stmt->fetchObject();

		$stmt = $db->prepare($instalias);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$resintalias = $stmt->fetchObject();

		$stmt = $db->prepare($euacts);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$reseuacts = $stmt->fetchObject();

		$stmt = $db->prepare($instacts);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$resinstacts = $stmt->fetchObject();

		$stmt = $db->prepare($bankaccounts);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$resbankaccounts = $stmt->fetchObject();

		$stmt = $db->prepare($timerecords);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$restimerecords = $stmt->fetchObject();


		$db = null;


// 		echo json_encode($result);
		echo '{"person:"'.json_encode($resperson).','
			 .'"projects:"'.json_encode($resprojects).','
			 .'"wps:"'.json_encode($reswps).','
			 .'"wrs:"'.json_encode($reswrs).','
			 .'"institutions:"'.json_encode($resinsts).','
			 .'"instaliases:"'.json_encode($resintalias).','
			 .'"euacts:"'.json_encode($reseuacts).','
			 .'"instacts:"'.json_encode($resinstacts).','
			 .'"bankaccounts:"'.json_encode($resbankaccounts).','
			 .'"timerecords:"'.json_encode($restimerecords)
			 .'}';
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
});

*/














///////////////////////////////////////
////////////               ////////////
////////////    RUN SLIM   ////////////
////////////               ////////////
///////////////////////////////////////


$app->run();

?>
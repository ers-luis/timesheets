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
$app->response()->header("Content-Type", "application/json");

$response = $app->response();
$response['Content-Type'] = 'application/json';
$response['X-Powered-By'] = 'timeAPI';
// $response->status(200);

// DATABASE PARAMS
require("dbparams.php"); // DB Params, Table names, etc
// $databasename = 'DB_NAME';
// $databasehost = 'localhost';
// $databaseport = '5432';
// $databaseuser = 'DB_USER';
// $databasepassword = 'DB_PASSWORD';

// DATABASE CONNECTION
$db = new PDO("pgsql:dbname=$databasename;host=$databasehost;port=$databaseport;", $databaseuser, $databasepassword);





///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
////////////////////////               ////////////////////////
////////////////////////   FUNCTIONS   ////////////////////////
////////////////////////               ////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////




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
});
// })->name('getProjects');

// get project by ID
$app->get('/project/:prid', function ($prid) use ($db, $app, $tablename_project) {
	$sql = 'SELECT pr.id AS id, pr.pname AS name, pr.pnumber AS number, pr.acronym AS acronym, pr.startdate AS start, pr.enddate AS end, pr.status AS status, pr.description AS description '
				.'FROM '.$tablename_project.' pr '
				.'WHERE pr.id=:id';
	try {
// 		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $prid);
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
	$result = $app->request->post();
	$sql = 'INSERT INTO '.$tablename_project.' (pnumber, pname, acronym, status, startdate, enddate, description) VALUES (:number, :name, :acronym, :status, :start, :end, :description)';
	try {
// 		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("number", $app->request->post('number'));
		$stmt->bindParam("name", $app->request->post('name'));
		$stmt->bindParam("acronym", $app->request->post('acronym'));
		$stmt->bindParam("status", $app->request->post('status'));
		$stmt->bindParam("start",$app->request->post('start'));
		$stmt->bindParam("end", $app->request->post('end'));
		$stmt->bindParam("description", $app->request->post('description'));
		$stmt->execute();
		$db = null;
		echo json_encode($result);
	} catch(PDOException $e) {
		error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
});
// })->name('createProject');

// update project by id
$app->put('/project/:id', function ($id) use ($db, $app, $tablename_project) {
// 	$request = Slim::getInstance()->request();
// 	$body = $request->getBody();
// 	$result = json_decode($body);
	$result = $app->request->post();
	$sql = 'UPDATE '.$tablename_project.' SET pnumber=:number, name=:name, acronym=:acronym, status=:status, startdate=:start, enddate=:end, description=:description WHERE id=:id';
	try {
// 		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("number", $app->request->post('number'));
		$stmt->bindParam("name", $app->request->post('name'));
		$stmt->bindParam("acronym", $app->request->post('acronym'));
		$stmt->bindParam("status", $app->request->post('status'));
		$stmt->bindParam("start", $app->request->post('start'));
		$stmt->bindParam("end", $app->request->post('end'));
		$stmt->bindParam("description", $app->request->post('description'));
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
			
// insert new person
$app->post('/person', function () use ($db, $app, $tablename_person) {
	$result = $app->request->post();
	$sql = 'INSERT INTO '.$tablename_person.' (pnumber, pname, acronym, status, startdate, enddate, description) VALUES (:number, :name, :acronym, :status, :start, :end, :description)';
	try {
// 		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("name", $app->request->post('name'));
		$stmt->bindParam("surnames", $app->request->post('acronym'));
		$stmt->bindParam("email", $app->request->post('status'));
		$stmt->bindParam("role",$app->request->post('start'));
		$stmt->bindParam("login", $app->request->post('end'));
		$stmt->bindParam("password", $app->request->post('description'));
		$stmt->execute();
		$db = null;
		echo json_encode($result);
	} catch(PDOException $e) {
		error_log($e->getMessage(), 3, '/var/tmp/php.log');
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








///////////////////////////////////////
////////////               ////////////
////////////   RESEARCHER  ////////////
////////////               ////////////
///////////////////////////////////////








///////////////////////////////////////
////////////               ////////////
////////////    RUN SLIM   ////////////
////////////               ////////////
///////////////////////////////////////


$app->run();

?>
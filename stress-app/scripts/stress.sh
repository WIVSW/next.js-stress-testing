#/bin/bash

# Number of requests for Apache Benchmark
CONCURENT=50;
TOTAL=500;

for config_name in `ls ./artillery | sed -e "s/.yaml//i"`; do
    host="http://localhost:3000/";
    
    if [ "${config_name}" == "react" ]; then
        host="http://localhost:3019/";
    fi

    url="${host}${config_name}";
    report_path="./reports/ab/${config_name}.log";
    
    touch $report_path;
    echo "Benchmarking ${host}${config_name}";
    ab -c $CONCURENT -n $TOTAL -r $url > $report_path;
    artillery run -o "./reports/json/${config_name}.json" "./artillery/${config_name}.yaml";
    artillery report -o "./reports/html/${config_name}.html" "./reports/json/${config_name}.json";

done;

node ./scripts/generate-ab-table.js
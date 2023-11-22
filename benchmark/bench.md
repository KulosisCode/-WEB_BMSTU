# Нагрузочное тестирование

Для проведения нагрузочного тестирования веб-веб сервера использовался Apache Benchmark.

Было проведено три теста с разным общим количеством запросов и с разным количеством параллельных запросов.

## Тест 1

#### Команда
```shell
ab -n 500 -c 50 -g out.data http://localhost:80/api/v1/rooms
```

### Результаты без балансировки

```
Server Software:        HotelBooking
Server Hostname:        localhost
Server Port:            80

Document Path:          /api/v1/rooms
Document Length:        1048 bytes

Concurrency Level:      50
Time taken for tests:   4.468 seconds
Complete requests:      500
Failed requests:        0
Total transferred:      640000 bytes
HTML transferred:       524000 bytes
Requests per second:    111.90 [#/sec] (mean)
Time per request:       446.811 [ms] (mean)
Time per request:       8.936 [ms] (mean, across all concurrent requests)
Transfer rate:          139.88 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1   1.4      0      12
Processing:    22  433 101.5    405     861
Waiting:       16  433 101.6    405     861
Total:         23  434 102.2    405     863
```

<!-- ![benchmark_without_1.png](img/benchmark_without_1.png) -->

### Результаты с балансировкой

```
Server Software:        HotelBooking
Server Hostname:        localhost
Server Port:            80

Document Path:          /api/v1/rooms
Document Length:        1048 bytes

Concurrency Level:      50
Time taken for tests:   2.407 seconds
Complete requests:      500
Failed requests:        0
Total transferred:      640000 bytes
HTML transferred:       524000 bytes
Requests per second:    207.75 [#/sec] (mean)
Time per request:       240.668 [ms] (mean)
Time per request:       4.813 [ms] (mean, across all concurrent requests)
Transfer rate:          259.69 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.7      0       6
Processing:     7  221 160.9    217     531
Waiting:        7  220 161.0    217     531
Total:          7  221 160.9    217     532
```


## Тест 2

#### Команда
```shell
ab -n 1000 -c 100 -g out.data http://localhost:80/api/v1/rooms
```

### Результаты без балансировки

```
Server Software:        HotelBooking
Server Hostname:        localhost
Server Port:            80

Document Path:          /api/v1/rooms
Document Length:        1048 bytes

Concurrency Level:      100
Time taken for tests:   8.178 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      1280000 bytes
HTML transferred:       1048000 bytes
Requests per second:    122.28 [#/sec] (mean)
Time per request:       817.812 [ms] (mean)
Time per request:       8.178 [ms] (mean, across all concurrent requests)
Transfer rate:          152.85 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1   3.6      0      16
Processing:   110  782 159.7    781    1436
Waiting:      110  782 159.9    781    1436
Total:        125  784 160.9    783    1439
```

### Результаты с балансировкой

```
Server Software:        HotelBooking
Server Hostname:        localhost
Server Port:            80

Document Path:          /api/v1/rooms
Document Length:        1048 bytes

Concurrency Level:      100
Time taken for tests:   3.657 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      1280000 bytes
HTML transferred:       1048000 bytes
Requests per second:    273.48 [#/sec] (mean)
Time per request:       365.652 [ms] (mean)
Time per request:       3.657 [ms] (mean, across all concurrent requests)
Transfer rate:          341.85 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1   1.5      0       6
Processing:     5  344 326.6    204     922
Waiting:        5  344 326.6    204     922
Total:          5  345 326.5    210     923
```

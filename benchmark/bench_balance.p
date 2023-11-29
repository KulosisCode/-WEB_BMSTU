# output as png image
set terminal png

# save file to "benchmark.png"
set output "benchmark12.png"

# graph title
set title "ab -n 1000 -c 100 -g out.data http://localhost:80/api/v1/rooms(с балансировкой)"

#nicer aspect ratio for image size
set size 0.95,1

# y-axis grid
set grid y

#x-axis label
set xlabel "request"

#y-axis label
set ylabel "response time (ms)"

#plot data from "out.data" using column 9 with smooth sbezier lines
plot "out12.data" using 9 smooth sbezier with lines title "HotelBooking"
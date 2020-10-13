from __future__ import print_function
import sys
import zerorpc


class CalcApi(object):

    def calc(self, num1, num2):
        """based on the input text, return the int result"""
        try:
            return num1 + num2
        except Exception:
            return 0.0

    def echo(self, text):
        """echo any text"""
        return text


def parse_port():
    port = 4242
    try:
        port = int(sys.argv[1])
    except Exception:
        pass
    return "{}".format(port)


def main():
    addr = "tcp://127.0.0.1:" + parse_port()
    s = zerorpc.Server(CalcApi())
    s.bind(addr)
    print("start running on {}".format(addr))
    s.run()


if __name__ == "__main__":
    main()

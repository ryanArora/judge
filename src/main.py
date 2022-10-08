import subprocess


def main() -> None:
    config_path = "./configs/python3.cfg"
    python_path = "/usr/local/bin/python3.10"

    code = 'print("HELLO JAIL!")'

    nsjail = subprocess.run(
        ["nsjail", "--config", config_path, "--", python_path, "-c", code],
        capture_output=True,
    )
    response = nsjail.stdout.decode("utf-8")
    print(response, end="")


if __name__ == "__main__":
    main()

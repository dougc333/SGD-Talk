import logging


def main() -> None:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
        filename="log.txt"
    )

    logging.info("logging info")
    logging.warning("logging warning")
    logging.error("logging error")
    logging.critical("logging critical")
    logging.debug("logging debug")
    logging.exception("logging exception") #same as logging.error only top 5 are common
    return 

if __name__ == "__main__":
    main()
    
